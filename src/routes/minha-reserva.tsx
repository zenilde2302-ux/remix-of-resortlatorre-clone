import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buscarReservasPorCpf } from "@/lib/reservas.functions";

export const Route = createFileRoute("/minha-reserva")({
  head: () => ({
    meta: [
      { title: "Consultar reserva pelo CPF" },
      {
        name: "description",
        content:
          "Digite seu CPF para ver o resumo da sua reserva: datas, acomodação, valor e situação.",
      },
      { property: "og:title", content: "Consultar reserva pelo CPF" },
      {
        property: "og:description",
        content: "Consulte o resumo da sua reserva informando apenas o CPF.",
      },
    ],
  }),
  component: MinhaReservaPage,
});

type Resumo = Awaited<ReturnType<typeof buscarReservasPorCpf>>[number];

const formatCpf = (value: string) => {
  const d = value.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
};

const formatDate = (value: string) =>
  new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const formatMoney = (value: number | null) =>
  value === null
    ? "—"
    : value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const nights = (a: string, b: string) =>
  Math.max(
    0,
    Math.round(
      (new Date(`${b}T12:00:00`).getTime() - new Date(`${a}T12:00:00`).getTime()) / 86_400_000,
    ),
  );

const statusLabel: Record<string, string> = {
  efetivada: "Confirmada",
  pendente: "Em análise",
  cancelada: "Cancelada",
  negada: "Não aprovada",
};

function MinhaReservaPage() {
  const buscar = useServerFn(buscarReservasPorCpf);
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<Resumo[] | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const digits = cpf.replace(/\D/g, "");
    if (digits.length !== 11) {
      setError("Digite os 11 números do CPF.");
      return;
    }
    setLoading(true);
    setError(null);
    setResultado(null);
    try {
      const rows = await buscar({ data: { cpf: digits } });
      setResultado(rows as Resumo[]);
    } catch {
      setError("Não foi possível consultar agora. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-muted px-4 py-12">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Consultar minha reserva
          </h1>
          <p className="text-sm text-muted-foreground">
            Informe o CPF usado na reserva para ver o resumo.
          </p>
        </header>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  inputMode="numeric"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(formatCpf(e.target.value))}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Consultando..." : "Consultar"}
              </Button>
            </form>
            {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
          </CardContent>
        </Card>

        {resultado !== null && resultado.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-sm text-muted-foreground">
              Nenhuma reserva encontrada para este CPF.
            </CardContent>
          </Card>
        ) : null}

        {resultado?.map((r) => (
          <Card key={r.codigo_reserva}>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Reserva {r.codigo_reserva}</CardTitle>
                <p className="text-sm text-muted-foreground">{r.hospede_nome}</p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {statusLabel[r.status] ?? r.status}
              </span>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">Check-in</dt>
                  <dd className="font-medium text-foreground">{formatDate(r.check_in)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Check-out</dt>
                  <dd className="font-medium text-foreground">{formatDate(r.check_out)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Noites</dt>
                  <dd className="font-medium text-foreground">{nights(r.check_in, r.check_out)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Acomodação</dt>
                  <dd className="font-medium text-foreground">{r.acomodacao ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Valor</dt>
                  <dd className="font-medium text-foreground">
                    {formatMoney(r.valor === null ? null : Number(r.valor))}
                    {r.parcelas && r.parcelas > 1 ? ` em ${r.parcelas}x` : ""}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Pagamento</dt>
                  <dd className="font-medium text-foreground">
                    {r.forma_pagamento ?? "—"}
                    {r.status_pagamento ? ` · ${r.status_pagamento}` : ""}
                  </dd>
                </div>
                {r.localizador ? (
                  <div>
                    <dt className="text-muted-foreground">Localizador</dt>
                    <dd className="font-medium text-foreground">{r.localizador}</dd>
                  </div>
                ) : null}
              </dl>
              {r.observacoes ? (
                <p className="mt-4 rounded-md bg-muted p-3 text-sm text-muted-foreground">
                  {r.observacoes}
                </p>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
