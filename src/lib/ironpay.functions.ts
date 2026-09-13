import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const IRONPAY_BASE = "https://api.ironpayapp.com.br/api/public/v1";

const schema = z.object({
  apiToken: z.string().min(4, "Informe o API Token da IronPay."),
  offerHash: z.string().min(1, "Informe o offer hash da IronPay."),
  productHash: z.string().min(1).optional(),
  amount: z.number().int().positive(),
  paymentMethod: z.enum(["pix", "credit_card", "billet"]),
  installments: z.number().int().min(1).max(12).default(1),
  title: z.string().min(1),
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone_number: z.string().min(8),
    document: z.string().min(8),
    zip_code: z.string().optional(),
    street_name: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
  }),
  card: z
    .object({
      number: z.string().min(12),
      holder_name: z.string().min(2),
      exp_month: z.string().min(1),
      exp_year: z.string().min(2),
      cvv: z.string().min(3),
    })
    .optional(),
});

export type IronPayResult = {
  status: string | null;
  hash: string | null;
  pixCode: string | null;
  pixQrCode: string | null;
  billetUrl: string | null;
};

const digits = (v: string) => v.replace(/\D/g, "");

function pick(obj: unknown, ...paths: string[]): string | null {
  for (const path of paths) {
    let cur: unknown = obj;
    for (const key of path.split(".")) {
      if (cur && typeof cur === "object" && key in (cur as Record<string, unknown>)) {
        cur = (cur as Record<string, unknown>)[key];
      } else {
        cur = undefined;
        break;
      }
    }
    if (typeof cur === "string" && cur.length > 0) return cur;
  }
  return null;
}

export const createIronPayTransaction = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }): Promise<IronPayResult> => {
    const c = data.customer;

    const body: Record<string, unknown> = {
      amount: data.amount,
      offer_hash: data.offerHash,
      payment_method: data.paymentMethod,
      customer: {
        name: c.name,
        email: c.email,
        phone_number: digits(c.phone_number),
        document: digits(c.document),
        street_name: c.street_name ?? "",
        number: c.number ?? "",
        complement: c.complement ?? "",
        neighborhood: c.neighborhood ?? "",
        city: c.city ?? "",
        state: c.state ?? "",
        zip_code: digits(c.zip_code ?? ""),
      },
      cart: [
        {
          product_hash: data.productHash ?? data.offerHash,
          title: data.title,
          cover: null,
          price: data.amount,
          quantity: 1,
          operation_type: 1,
          tangible: false,
        },
      ],
      expire_in_days: 1,
      transaction_origin: "api",
    };

    if (data.paymentMethod === "credit_card") {
      if (!data.card) throw new Error("Preencha os dados do cartão.");
      body["installments"] = data.installments;
      body["card"] = {
        number: digits(data.card.number),
        holder_name: data.card.holder_name,
        exp_month: Number(data.card.exp_month),
        exp_year: Number(data.card.exp_year),
        cvv: data.card.cvv,
      };
    }

    const res = await fetch(
      `${IRONPAY_BASE}/transactions?api_token=${encodeURIComponent(data.apiToken)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      },
    );

    const text = await res.text();
    let json: unknown = null;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }

    if (!res.ok) {
      const message =
        pick(json, "message", "error", "errors.0") ??
        `A IronPay recusou a transação (código ${res.status}).`;
      throw new Error(message);
    }

    return {
      status: pick(json, "status", "data.status", "transaction.status") ?? "pending",
      hash: pick(json, "hash", "transaction_hash", "data.hash", "transaction.hash"),
      pixCode: pick(json, "pix.pix_qr_code", "pix_code", "data.pix.pix_qr_code", "pix.qr_code"),
      pixQrCode: pick(json, "pix.pix_qr_code_image", "pix_qr_code_image", "data.pix.pix_qr_code_image"),
      billetUrl: pick(json, "billet.billet_url", "billet_url", "data.billet.billet_url"),
    };
  });
