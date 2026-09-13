import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const cpfSchema = z
  .string()
  .trim()
  .max(20)
  .transform(onlyDigits)
  .refine((v) => v.length === 11, { message: "CPF deve ter 11 dígitos" });

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .nullable()
    .transform((v) => (v === "" || v === undefined ? null : v));

export const reservaInputSchema = z.object({
  codigo_reserva: z.string().trim().nonempty().max(40),
  status: z.enum(["efetivada", "cancelada", "negada", "pendente"]),
  check_in: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  check_out: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  acomodacao: optionalText(120),
  hospede_nome: z.string().trim().nonempty().max(160),
  hospede_cpf: cpfSchema,
  hospede_email: optionalText(255),
  hospede_telefone: optionalText(40),
  titular_nome: optionalText(160),
  titular_cpf: z
    .string()
    .trim()
    .max(20)
    .optional()
    .nullable()
    .transform((v) => {
      const digits = onlyDigits(v ?? "");
      return digits.length === 11 ? digits : null;
    }),
  forma_pagamento: optionalText(60),
  codigo_pagamento: optionalText(40),
  parcelas: z.coerce.number().int().min(0).max(48).optional().nullable(),
  valor: z.coerce.number().min(0).max(10_000_000).optional().nullable(),
  status_pagamento: optionalText(40),
  localizador: optionalText(40),
  cep: optionalText(20),
  telefone_curto: optionalText(30),
  data_venda: z
    .string()
    .trim()
    .optional()
    .nullable()
    .transform((v) => (v ? v : null)),
  observacoes: optionalText(1000),
});

export type ReservaInput = z.infer<typeof reservaInputSchema>;

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data: isAdmin } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!isAdmin) throw new Error("Acesso restrito");
}

export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("claim_admin");
    if (error) throw new Error(error.message);
    return { isAdmin: Boolean(data) };
  });

export const listReservas = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("reservas")
      .select("*")
      .order("check_in", { ascending: true });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const saveReserva = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid().optional().nullable(), values: reservaInputSchema }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    if (data.id) {
      const { error } = await context.supabase
        .from("reservas")
        .update(data.values)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: inserted, error } = await context.supabase
      .from("reservas")
      .insert(data.values)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: inserted.id as string };
  });

export const deleteReserva = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("reservas").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/**
 * Public lookup: a guest types their CPF and gets only their own summary.
 * No listing, no browsing — an exact CPF match is required.
 */
export const buscarReservasPorCpf = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ cpf: cpfSchema }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("reservas")
      .select(
        "codigo_reserva, status, check_in, check_out, acomodacao, hospede_nome, valor, parcelas, forma_pagamento, status_pagamento, localizador, observacoes",
      )
      .or(`hospede_cpf.eq.${data.cpf},titular_cpf.eq.${data.cpf}`)
      .order("check_in", { ascending: true });
    if (error) throw new Error("Não foi possível consultar agora. Tente novamente.");
    return rows ?? [];
  });
