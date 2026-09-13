import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import {
  claimAdmin,
  deleteReserva,
  listReservas,
  saveReserva,
  type ReservaInput,
} from "@/lib/reservas.functions";

export const Route = createFileRoute("/_authenticated/reservas")({
  head: () => ({
    meta: [
      { title: "Cadastro de reservas | Área restrita" },
      { name: "description", content: "Cadastro e gestão interna das reservas." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Cadastro de reservas" },
      { property: "og:description", content: "Área restrita de gestão de reservas." },
    ],
  }),
  component: AdminReservasPage,
});

const emptyForm = {
  codigo_reserva: "",
  status: "efetivada",
  check_in: "",
  check_out: "",
  acomodacao: "",
  hospede_nome: "",
  hospede_cpf: "",
  hospede_email: "",
  hospede_telefone: "",
  titular_nome: "",
  titular_cpf: "",
  forma_pagamento: "",
  codigo_pagamento: "",
  parcelas: "",
  valor: "",
  status_pagamento: "",
  localizador: "",
  cep: "",
  telefone_curto: "",
  data_venda: "",
  observacoes: "",
};

type FormState = typeof emptyForm;
type ReservaRow = Awaited<ReturnType<typeof listReservas>>[number];

const statusOptions = ["efetivada", "pendente", "cancelada", "negada"];

function toFormState(source: ReservaRow): FormState {
  const row = source as unknown as Record<string, unknown>;
  const next = { ...emptyForm };
  for (const key of Object.keys(emptyForm) as (keyof FormState)[]) {
    const value = row[key];
    next[key] = value === null || value === undefined ? "" : String(value);
  }
  return next;
}

function toPayload(form: FormState): ReservaInput {
  return {
    ...form,
    parcelas: form.parcelas === "" ? null : Number(form.parcelas),
    valor: form.valor === "" ? null : Number(form.valor),
  } as unknown as ReservaInput;
}

function AdminReservasPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchList = useServerFn(listReservas);
  const claim = useServerFn(claimAdmin);
  const save = useServerFn(saveReserva);
  const remove = useServerFn(deleteReserva);

  const [ready, setReady] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    claim({}).finally(() => setReady(true));
  }, [claim]);

  const reservas = useQuery({
    queryKey: ["reservas"],
    queryFn: () => fetchList({}),
    enabled: ready,
  });

  const saveMutation = useMutation({
    mutationFn: (vars: { id: string | null; values: ReservaInput }) => save({ data: vars }),
    onSuccess: () => {
      setFeedback(editingId ? "Reserva atualizada." : "Reserva cadastrada.");
      setError(null);
      setForm(emptyForm);
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["reservas"] });
    },
    onError: (e: Error) => {
      setFeedback(null);
      setError(e.message || "Não foi possível salvar.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      setFeedback("Reserva removida.");
      queryClient.invalidateQueries({ queryKey: ["reservas"] });
    },
  });

  const set = (key: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const rows: ReservaRow[] = reservas.data ?? [];
  const termo = filtro.replace(/\D/g, "");
  const visiveis = rows.filter((r) =>
    filtro.trim() === ""
      ? true
      : termo.length > 0
        ? String(r.hospede_cpf).includes(termo) ||
          String(r.titular_cpf ?? "").includes(termo) ||
          String(r.codigo_reserva).includes(termo)
        : String(r.hospede_nome).toLowerCase().includes(filtro.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-muted px-4 py-10">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Cadastro de reservas
            </h1>
            <p className="text-sm text-muted-foreground">
              Área restrita. Os hóspedes consultam o resumo em /minha-reserva.
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Sair
          </Button>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Editar reserva" : "Nova reserva"}</CardTitle>
            <CardDescription>Campos com * são obrigatórios.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              onSubmit={(e) => {
                e.preventDefault();
                try {
                  saveMutation.mutate({ id: editingId, values: toPayload(form) });
                } catch {
                  setError("Revise os campos preenchidos.");
                }
              }}
            >
              <Field label="Código da reserva *" value={form.codigo_reserva} onChange={set("codigo_reserva")} required />
              <div className="space-y-2">
                <Label htmlFor="status">Situação *</Label>
                <select
                  id="status"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.status}
                  onChange={(e) => set("status")(e.target.value)}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <Field label="Acomodação" value={form.acomodacao} onChange={set("acomodacao")} />
              <Field label="Check-in *" type="date" value={form.check_in} onChange={set("check_in")} required />
              <Field label="Check-out *" type="date" value={form.check_out} onChange={set("check_out")} required />
              <Field label="Data da venda" type="date" value={form.data_venda} onChange={set("data_venda")} />
              <Field label="Hóspede *" value={form.hospede_nome} onChange={set("hospede_nome")} required />
              <Field label="CPF do hóspede *" value={form.hospede_cpf} onChange={set("hospede_cpf")} required />
              <Field label="E-mail" type="email" value={form.hospede_email} onChange={set("hospede_email")} />
              <Field label="Telefone" value={form.hospede_telefone} onChange={set("hospede_telefone")} />
              <Field label="Titular" value={form.titular_nome} onChange={set("titular_nome")} />
              <Field label="CPF do titular" value={form.titular_cpf} onChange={set("titular_cpf")} />
              <Field label="Forma de pagamento" value={form.forma_pagamento} onChange={set("forma_pagamento")} />
              <Field label="Código do pagamento" value={form.codigo_pagamento} onChange={set("codigo_pagamento")} />
              <Field label="Parcelas" type="number" value={form.parcelas} onChange={set("parcelas")} />
              <Field label="Valor (R$)" type="number" value={form.valor} onChange={set("valor")} />
              <Field label="Situação do pagamento" value={form.status_pagamento} onChange={set("status_pagamento")} />
              <Field label="Localizador" value={form.localizador} onChange={set("localizador")} />
              <Field label="CEP" value={form.cep} onChange={set("cep")} />
              <Field label="Telefone curto" value={form.telefone_curto} onChange={set("telefone_curto")} />

              <div className="space-y-2 sm:col-span-2 lg:col-span-3">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  maxLength={1000}
                  value={form.observacoes}
                  onChange={(e) => set("observacoes")(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:col-span-2 lg:col-span-3">
                <Button type="submit" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? "Salvando..." : editingId ? "Salvar alterações" : "Cadastrar reserva"}
                </Button>
                {editingId ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyForm);
                    }}
                  >
                    Cancelar edição
                  </Button>
                ) : null}
                {feedback ? <span className="text-sm text-muted-foreground">{feedback}</span> : null}
                {error ? <span className="text-sm text-destructive">{error}</span> : null}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
            <CardTitle>Reservas cadastradas ({rows.length})</CardTitle>
            <Input
              className="w-full sm:w-64"
              placeholder="Buscar por CPF, código ou nome"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </CardHeader>
          <CardContent>
            {reservas.isLoading ? (
              <p className="text-sm text-muted-foreground">Carregando...</p>
            ) : visiveis.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhuma reserva encontrada.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-muted-foreground">
                    <tr>
                      <th className="py-2 pr-4">Código</th>
                      <th className="py-2 pr-4">Hóspede</th>
                      <th className="py-2 pr-4">CPF</th>
                      <th className="py-2 pr-4">Período</th>
                      <th className="py-2 pr-4">Situação</th>
                      <th className="py-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {visiveis.map((r) => (
                      <tr key={r.id} className="border-t border-border">
                        <td className="py-2 pr-4">{r.codigo_reserva}</td>
                        <td className="py-2 pr-4">{r.hospede_nome}</td>
                        <td className="py-2 pr-4">{r.hospede_cpf}</td>
                        <td className="py-2 pr-4">
                          {r.check_in} → {r.check_out}
                        </td>
                        <td className="py-2 pr-4">{r.status}</td>
                        <td className="py-2">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingId(r.id as string);
                                setForm(toFormState(r));
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                            >
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteMutation.mutate(r.id as string)}
                            >
                              Excluir
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
