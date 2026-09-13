import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Barcode,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  KeyRound,
  Loader2,
  Lock,
  QrCode,
  Users,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PROMOS, brl } from "@/data/latorre";
import { createIronPayTransaction } from "@/lib/ironpay.functions";

type Search = { promo?: string | undefined; nights?: number | undefined; guests?: number | undefined };

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    promo: typeof search["promo"] === "string" ? search["promo"] : undefined,
    nights: Number(search["nights"]) > 0 ? Number(search["nights"]) : undefined,
    guests: Number(search["guests"]) > 0 ? Number(search["guests"]) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Checkout Seguro - Resort La Torre All Inclusive" },
      {
        name: "description",
        content:
          "Finalize a sua reserva no Resort La Torre All Inclusive em Porto Seguro com pagamento seguro via Pix, cartão de crédito ou boleto.",
      },
      { property: "og:title", content: "Checkout Seguro - Resort La Torre All Inclusive" },
      {
        property: "og:description",
        content: "Finalize a sua reserva All Inclusive na Praia do Mutá com pagamento seguro.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const METHODS = [
  { id: "pix", label: "Pix", Icon: QrCode, hint: "Aprovação imediata" },
  { id: "credit_card", label: "Cartão de crédito", Icon: CreditCard, hint: "Em até 10x" },
  { id: "billet", label: "Boleto", Icon: Barcode, hint: "Vence em 1 dia" },
] as const;

const field =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-brand-ink outline-none transition-colors placeholder:text-black/35 focus:border-brand-blue";
const labelCls = "mb-1.5 block text-[13px] font-semibold text-brand-navy";

function CheckoutPage() {
  const search = Route.useSearch();
  const promo = useMemo(
    () => PROMOS.find((p) => p.slug === search.promo) ?? PROMOS[0]!,
    [search.promo],
  );
  const nights = search.nights ?? 5;
  const guests = search.guests ?? 2;

  const [method, setMethod] = useState<(typeof METHODS)[number]["id"]>("pix");
  const [installments, setInstallments] = useState(1);

  const [apiToken, setApiToken] = useState("");
  const [offerHash, setOfferHash] = useState("");
  const [productHash, setProductHash] = useState("");
  const [savedToken, setSavedToken] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone_number: "",
    document: "",
    zip_code: "",
    street_name: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  const [card, setCard] = useState({ number: "", holder_name: "", exp_month: "", exp_year: "", cvv: "" });

  useEffect(() => {
    setApiToken(localStorage.getItem("ironpay_api_token") ?? "");
    setOfferHash(localStorage.getItem("ironpay_offer_hash") ?? "");
    setProductHash(localStorage.getItem("ironpay_product_hash") ?? "");
  }, []);

  const subtotal = promo.price * nights;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + taxes;

  const createTx = useServerFn(createIronPayTransaction);
  const mutation = useMutation({ mutationFn: createTx });

  const saveConfig = () => {
    localStorage.setItem("ironpay_api_token", apiToken.trim());
    localStorage.setItem("ironpay_offer_hash", offerHash.trim());
    localStorage.setItem("ironpay_product_hash", productHash.trim());
    setSavedToken(true);
    window.setTimeout(() => setSavedToken(false), 2500);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.reset();
    mutation.mutate({
      data: {
        apiToken: apiToken.trim(),
        offerHash: offerHash.trim(),
        productHash: productHash.trim() || undefined,
        amount: Math.round(total * 100),
        paymentMethod: method,
        installments: method === "credit_card" ? installments : 1,
        title: `Reserva ${promo.label} - ${nights} noites`,
        customer,
        card: method === "credit_card" ? card : undefined,
      },
    });
  };

  const result = mutation.data;

  return (
    <div className="flex min-h-screen flex-col bg-brand-sand">
      <Header />

      <main className="flex-1">
        <div className="bg-brand-blue py-10 text-white">
          <div className="container-lt">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" /> Voltar para o site
            </Link>
            <h1 className="mt-3 text-3xl font-bold md:text-4xl">Finalize a sua reserva</h1>
            <p className="mt-2 max-w-2xl text-white/90">
              Ambiente seguro. Sua estadia All Inclusive na Praia do Mutá está a poucos passos.
            </p>
          </div>
        </div>

        <div className="container-lt grid gap-8 py-10 lg:grid-cols-[1fr_380px] lg:py-14">
          <form onSubmit={submit} className="space-y-6">
            {/* IronPay */}
            <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm md:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-brand-amber/25 text-brand-navy">
                  <KeyRound className="size-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-brand-navy">Integração IronPay</h2>
                  <p className="text-sm text-black/55">
                    Informe o seu token da API para processar as compras.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className={labelCls} htmlFor="apiToken">
                    API Token IronPay
                  </label>
                  <input
                    id="apiToken"
                    type="password"
                    autoComplete="off"
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                    placeholder="Cole aqui o seu api_token"
                    className={field}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="offerHash">
                    Offer hash
                  </label>
                  <input
                    id="offerHash"
                    value={offerHash}
                    onChange={(e) => setOfferHash(e.target.value)}
                    placeholder="ex: 7becb"
                    className={field}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="productHash">
                    Product hash
                  </label>
                  <input
                    id="productHash"
                    value={productHash}
                    onChange={(e) => setProductHash(e.target.value)}
                    placeholder="ex: 7tjdfkshdv"
                    className={field}
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={saveConfig}
                  className="min-h-11 w-full rounded-full bg-brand-navy px-6 text-sm font-semibold text-white transition-transform hover:opacity-90 active:scale-[0.98] sm:w-auto"
                >
                  Salvar credenciais neste navegador
                </button>
                {savedToken && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    <CheckCircle2 className="size-4" /> Salvo
                  </span>
                )}
              </div>
            </section>

            {/* Dados do hóspede */}
            <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm md:p-7">
              <h2 className="text-lg font-bold text-brand-navy">Dados do hóspede</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {(
                  [
                    ["name", "Nome completo", "João Silva", "md:col-span-2"],
                    ["email", "E-mail", "joao@email.com", ""],
                    ["phone_number", "WhatsApp", "73999999999", ""],
                    ["document", "CPF", "000.000.000-00", ""],
                    ["zip_code", "CEP", "45810-000", ""],
                    ["street_name", "Endereço", "Av. Beira Mar", "md:col-span-2"],
                    ["number", "Número", "9999", ""],
                    ["complement", "Complemento", "Apto 45", ""],
                    ["neighborhood", "Bairro", "Praia do Mutá", ""],
                    ["city", "Cidade", "Porto Seguro", ""],
                    ["state", "Estado", "BA", ""],
                  ] as const
                ).map(([key, label, ph, cls]) => (
                  <div key={key} className={cls}>
                    <label className={labelCls} htmlFor={key}>
                      {label}
                    </label>
                    <input
                      id={key}
                      required={["name", "email", "phone_number", "document"].includes(key)}
                      value={customer[key]}
                      onChange={(e) => setCustomer((c) => ({ ...c, [key]: e.target.value }))}
                      placeholder={ph}
                      className={field}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Pagamento */}
            <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm md:p-7">
              <h2 className="text-lg font-bold text-brand-navy">Forma de pagamento</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {METHODS.map(({ id, label, Icon, hint }) => {
                  const active = method === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setMethod(id)}
                      aria-pressed={active}
                      className={`flex min-h-[92px] flex-col items-start justify-center gap-1 rounded-xl border-2 px-4 py-3 text-left transition-all active:scale-[0.98] ${
                        active
                          ? "border-brand-blue bg-brand-blue/5"
                          : "border-black/10 hover:border-brand-blue/50"
                      }`}
                    >
                      <Icon className={active ? "size-5 text-brand-blue" : "size-5 text-black/45"} />
                      <span className="text-sm font-semibold text-brand-navy">{label}</span>
                      <span className="text-xs text-black/50">{hint}</span>
                    </button>
                  );
                })}
              </div>

              {method === "credit_card" && (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className={labelCls} htmlFor="cardNumber">
                      Número do cartão
                    </label>
                    <input
                      id="cardNumber"
                      inputMode="numeric"
                      value={card.number}
                      onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))}
                      placeholder="4111 1111 1111 1111"
                      className={field}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelCls} htmlFor="holder">
                      Nome impresso no cartão
                    </label>
                    <input
                      id="holder"
                      value={card.holder_name}
                      onChange={(e) => setCard((c) => ({ ...c, holder_name: e.target.value }))}
                      placeholder="JOAO SILVA"
                      className={field}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:col-span-1">
                    <div>
                      <label className={labelCls} htmlFor="expMonth">
                        Mês
                      </label>
                      <input
                        id="expMonth"
                        inputMode="numeric"
                        value={card.exp_month}
                        onChange={(e) => setCard((c) => ({ ...c, exp_month: e.target.value }))}
                        placeholder="12"
                        className={field}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="expYear">
                        Ano
                      </label>
                      <input
                        id="expYear"
                        inputMode="numeric"
                        value={card.exp_year}
                        onChange={(e) => setCard((c) => ({ ...c, exp_year: e.target.value }))}
                        placeholder="2030"
                        className={field}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls} htmlFor="cvv">
                        CVV
                      </label>
                      <input
                        id="cvv"
                        inputMode="numeric"
                        value={card.cvv}
                        onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value }))}
                        placeholder="123"
                        className={field}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="installments">
                        Parcelas
                      </label>
                      <select
                        id="installments"
                        value={installments}
                        onChange={(e) => setInstallments(Number(e.target.value))}
                        className={field}
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}x de {brl(total / n)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-amber px-8 text-base font-bold text-brand-ink shadow-lg transition-transform hover:brightness-105 active:scale-[0.99] disabled:opacity-60"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Processando pagamento…
                </>
              ) : (
                <>
                  <Lock className="size-5" /> Pagar {brl(total)}
                </>
              )}
            </button>

            {mutation.isError && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {(mutation.error as Error).message}
              </p>
            )}

            {result && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:p-7">
                <p className="flex items-center gap-2 text-base font-bold text-emerald-700">
                  <BadgeCheck className="size-5" /> Transação criada — status: {result.status ?? "pending"}
                </p>
                {result.hash && (
                  <p className="mt-2 text-sm text-emerald-800">
                    Código da transação: <span className="font-mono">{result.hash}</span>
                  </p>
                )}
                {result.pixCode && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-emerald-800">Copie o código Pix:</p>
                    <textarea
                      readOnly
                      value={result.pixCode}
                      rows={3}
                      className="mt-2 w-full rounded-xl border border-emerald-200 bg-white p-3 font-mono text-xs"
                    />
                  </div>
                )}
                {result.pixQrCode && (
                  <img src={result.pixQrCode} alt="QR Code Pix" className="mt-4 size-48 rounded-xl bg-white p-2" />
                )}
                {result.billetUrl && (
                  <a
                    href={result.billetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white"
                  >
                    Abrir boleto
                  </a>
                )}
              </div>
            )}
          </form>

          {/* Resumo */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
              <img src={promo.image} alt={promo.label} className="h-44 w-full object-cover" loading="lazy" />
              <div className="p-5 md:p-6">
                <h2 className="text-lg font-bold text-brand-navy">{promo.label}</h2>
                <p className="mt-1 text-sm text-black/60">{promo.title}</p>

                <div className="mt-5 space-y-3 text-sm">
                  <p className="flex items-center gap-2 text-black/70">
                    <CalendarDays className="size-4 text-brand-blue" /> {nights} noites — All Inclusive
                  </p>
                  <p className="flex items-center gap-2 text-black/70">
                    <Users className="size-4 text-brand-blue" /> {guests} hóspedes
                  </p>
                </div>

                <div className="mt-5 space-y-2 border-t border-black/5 pt-5 text-sm">
                  <div className="flex justify-between text-black/70">
                    <span>
                      {brl(promo.price)} x {nights} noites
                    </span>
                    <span>{brl(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-black/70">
                    <span>Taxas e serviços</span>
                    <span>{brl(taxes)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-black/5 pt-3 text-lg font-bold text-brand-navy">
                    <span>Total</span>
                    <span>{brl(total)}</span>
                  </div>
                </div>

                <p className="mt-4 flex items-center gap-2 text-xs text-black/50">
                  <Lock className="size-3.5" /> Pagamento processado com segurança pela IronPay.
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              {PROMOS.filter((p) => p.slug !== promo.slug).map((p) => (
                <Link
                  key={p.slug}
                  to="/checkout"
                  search={{ promo: p.slug, nights, guests }}
                  className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-black/5 bg-white px-4 py-3 text-sm transition-colors hover:border-brand-blue/40"
                >
                  <span className="font-semibold text-brand-navy">{p.label}</span>
                  <span className="text-black/60">{brl(p.price)}/noite</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
