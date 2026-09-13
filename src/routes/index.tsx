import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Star, Tv, Users, Wifi, Wind } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ACOMODACOES, BADGES, DIFERENCIAIS, EXPERIENCIAS, IMG, PROMOS } from "@/data/latorre";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resort All Inclusive em Porto Seguro - BA | Resort La Torre" },
      {
        name: "description",
        content:
          "Desfrute no Resort La Torre: um All Inclusive de excelência na Praia do Mutá, em Porto Seguro. Ideal para famílias, casais e pets.",
      },
      { property: "og:title", content: "Resort All Inclusive em Porto Seguro - BA | Resort La Torre" },
      {
        property: "og:description",
        content: "All Inclusive de excelência na Praia do Mutá, Porto Seguro - BA. Um mundo à parte.",
      },
      { property: "og:image", content: IMG.heroDesktop },
      { name: "twitter:image", content: IMG.heroDesktop },
    ],
  }),
  component: Home,
});

const yellowBtn =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-brand-amber px-8 text-base font-bold text-brand-ink shadow-lg transition-transform hover:brightness-105 active:scale-[0.98]";
const outlineBtn =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-brand-blue bg-white px-7 text-[15px] font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white active:scale-[0.98]";
const blueBtn =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-brand-blue px-8 text-[15px] font-semibold text-white transition-transform hover:brightness-110 active:scale-[0.98]";

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-sand">
      <Header />
      <main className="flex-1">
        <Hero />
        <Banner />
        <Promocoes />
        <PorQue />
        <Badges />
        <Experiencias />
        <Sobre />
        <Acomodacoes />
        <Esg />
        <Newsletter />
        <Qualidade />
        <Revista />
      </main>
      <Footer />
    </div>
  );
}

function BookingBar({ className = "" }: { className?: string }) {
  const [guests, setGuests] = useState(2);
  return (
    <div
      className={`flex w-full flex-col items-stretch gap-3 rounded-3xl bg-white p-3 shadow-xl sm:flex-row sm:items-center sm:gap-4 sm:rounded-full sm:p-3 ${className}`}
    >
      <span className="flex items-center justify-center gap-2 px-3 text-[15px] font-bold text-brand-ink sm:justify-start">
        Faça sua reserva <ArrowRight className="size-5" />
      </span>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:bg-brand-amber">
        <label className="flex min-h-12 flex-1 items-center gap-2 rounded-full bg-brand-amber px-5 text-[15px] font-medium text-brand-ink">
          <CalendarDays className="size-5 shrink-0" />
          <input
            type="date"
            aria-label="Entrada"
            className="w-full bg-transparent outline-none"
          />
        </label>
        <span className="hidden h-6 w-px bg-black/15 sm:block" />
        <label className="flex min-h-12 flex-1 items-center gap-2 rounded-full bg-brand-amber px-5 text-[15px] font-medium text-brand-ink">
          <CalendarDays className="size-5 shrink-0" />
          <input type="date" aria-label="Saída" className="w-full bg-transparent outline-none" />
        </label>
        <span className="hidden h-6 w-px bg-black/15 sm:block" />
        <label className="flex min-h-12 items-center gap-2 rounded-full bg-brand-amber px-5 text-[15px] font-medium text-brand-ink">
          <Users className="size-5 shrink-0" />
          <select
            aria-label="Hóspedes"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="bg-transparent outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} Hóspedes
              </option>
            ))}
          </select>
        </label>
      </div>
      <Link
        to="/checkout"
        search={{ guests }}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-blue px-7 text-[15px] font-semibold text-white transition-transform hover:brightness-110 active:scale-[0.98]"
      >
        Reservar
      </Link>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="relative min-h-[520px] overflow-hidden md:min-h-[560px]">
        <img
          src={IMG.heroMobile}
          alt="Resort La Torre - Praia do Mutá"
          className="absolute inset-0 size-full object-cover md:hidden"
        />
        <img
          src={IMG.heroDesktop}
          alt="Resort La Torre - Praia do Mutá"
          className="absolute inset-0 hidden size-full object-cover md:block"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="container-lt relative flex min-h-[520px] flex-col items-center justify-center pt-10 pb-40 text-center md:min-h-[560px]">
          <h1 className="text-4xl font-bold text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
            Confira ofertas exclusivas
          </h1>
          <p className="mt-3 text-xl font-medium text-white drop-shadow md:text-3xl">
            Um mundo à parte.
          </p>
          <div className="mt-4 flex items-center gap-2 text-white drop-shadow">
            <span className="text-lg font-semibold">4.7</span>
            <span className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-4 fill-brand-amber text-brand-amber" />
              ))}
            </span>
            <span className="text-xs md:text-sm">Com base em 9804 revisões</span>
          </div>
          <Link to="/checkout" search={{}} hash="" className={`mt-8 ${yellowBtn}`}>
            Confira ofertas exclusivas
          </Link>
        </div>
      </div>

      <div className="container-lt relative -mt-28 pb-8 md:-mt-16">
        <div className="mx-auto max-w-4xl">
          <BookingBar />
        </div>
      </div>
    </section>
  );
}

function Banner() {
  return (
    <section className="container-lt pb-12">
      <Link to="/checkout" search={{ promo: "reveillon-2027" }} className="block overflow-hidden rounded-2xl">
        <img
          src={IMG.bannerDezembro}
          alt="Dezembro - Sons e Sabores Brasileiros"
          className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          loading="lazy"
        />
      </Link>
    </section>
  );
}

function SectionTitle({ title, subtitle, id }: { title: string; subtitle: string; id?: string }) {
  return (
    <div className="container-lt text-center" {...(id ? { id } : {})}>
      <h2 className="text-2xl font-bold text-brand-blue sm:text-3xl md:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-3xl text-base text-brand-blue/90 md:text-lg">{subtitle}</p>
    </div>
  );
}

function Promocoes() {
  return (
    <section className="scroll-mt-24 py-10" id="promocoes">
      <SectionTitle
        title="Viva Momentos Inesquecíveis no Resort La Torre"
        subtitle="Desfrute seu All Inclusive na Bahia em harmonia com a natureza 🌿"
      />
      <div className="container-lt mt-8">
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {PROMOS.map((p) => (
            <Link
              key={p.slug}
              to="/checkout"
              search={{ promo: p.slug }}
              className="group w-[78vw] shrink-0 snap-center sm:w-[46vw] md:w-auto"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-md">
                <img
                  src={p.image}
                  alt={p.label}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  <span className="text-xs font-medium leading-tight">
                    Diárias
                    <br />a partir de:
                  </span>
                  <span className="text-2xl font-bold">
                    <span className="text-sm align-top">R$</span>
                    {p.price}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-center text-sm text-black/60">
                Visto <strong className="text-brand-ink">{p.views.toLocaleString("pt-BR")}</strong> vezes
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PorQue() {
  return (
    <section className="bg-brand-blue py-12 md:py-16">
      <div className="container-lt text-center text-white">
        <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Por que escolher o La Torre Resort?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base md:text-lg">
          Descubra nossos diferenciais e veja porque somos a escolha certa para suas férias.
        </p>
      </div>
      <div className="container-lt mt-10">
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {DIFERENCIAIS.map((d) => (
            <article
              key={d.title}
              className="flex w-[80vw] shrink-0 snap-center flex-col rounded-2xl bg-white p-4 shadow-lg sm:w-[46vw] md:w-auto"
            >
              <img
                src={d.image}
                alt={d.title}
                className="aspect-square w-full rounded-xl object-cover"
                loading="lazy"
              />
              <h3 className="mt-4 text-lg font-bold text-brand-blue">{d.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-black/65">{d.text}</p>
              <Link to="/checkout" search={{}} className={`mt-5 ${outlineBtn}`}>
                Saiba mais
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Badges() {
  return (
    <section className="bg-white py-10">
      <div className="container-lt">
        <div className="no-scrollbar flex items-center justify-start gap-6 overflow-x-auto md:justify-between">
          {BADGES.map((b, i) => (
            <img
              key={b}
              src={b}
              alt={
                ["All Inclusive 24 horas", "Até 2 crianças grátis", "Clube de Praia exclusivo", "Melhor preço", "Pagamento em até 10x"][i]
              }
              className="h-28 w-auto shrink-0 md:h-36"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Experiencias() {
  return (
    <section className="scroll-mt-24 py-12 md:py-16" id="experiencias">
      <SectionTitle
        title="Experiências e Atividades"
        subtitle="Ambientes que proporcionam momentos únicos para se conectar com sua família, seus amigos e a natureza ao seu redor. 🌴"
      />
      <div className="container-lt mt-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {EXPERIENCIAS.map((e) => (
            <article key={e.label} className="group overflow-hidden rounded-2xl shadow-md">
              <div className="relative">
                <img
                  src={e.image}
                  alt={e.label}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <span className="text-xs font-bold tracking-wide text-white md:text-sm">{e.label}</span>
                  <p className="mt-1 line-clamp-3 text-[11px] leading-snug text-white/85 md:text-xs">
                    {e.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/checkout" search={{}} className={blueBtn}>
            Ver todas as experiências
          </Link>
        </div>
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <section className="bg-brand-blue text-white">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-20">
          <h2 className="text-2xl font-bold sm:text-3xl">Movidos pela Paixão em hospitalidade</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/95">
            Movidos pela paixão em hospitalidade, no Resort La Torre criamos um espaço de pertencimento e
            felicidade na Praia do Mutá, onde a <strong>sofisticação e a natureza</strong> se encontram.
            Nosso propósito é surpreender, oferecendo momentos genuínos e exclusivos que elevam sua
            satisfação em um <strong>All Inclusive</strong> com <strong>gastronomia diferenciada</strong>,
            ambiente <strong>pet friendly</strong>, práticas <strong>ESG</strong> e acesso direto à praia. A
            cada detalhe, transmitimos o amor pela arte de receber bem, transformando sua visita em uma
            experiência inesquecível.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" className={`${outlineBtn} border-white bg-white text-brand-blue`}>
              Fotos
            </button>
            <button type="button" className={`${outlineBtn} border-white bg-white text-brand-blue`}>
              Vídeos
            </button>
          </div>
        </div>
        <img
          src={IMG.heroDesktop}
          alt="Praia do Mutá vista aérea"
          className="h-64 w-full object-cover md:h-full"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function Acomodacoes() {
  return (
    <section className="scroll-mt-24 py-12 md:py-16" id="acomodacoes">
      <SectionTitle
        title="Quartos e Acomodações"
        subtitle="Confira nossos quartos e acomodações planejadas especialmente para o seu conforto. 🛏️"
      />
      <div className="container-lt mt-8">
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0">
          {ACOMODACOES.map((a) => (
            <article
              key={a.name}
              className="relative w-[86vw] shrink-0 snap-center overflow-hidden rounded-2xl shadow-md sm:w-[60vw] md:w-[520px]"
            >
              <img src={a.image} alt={a.name} className="aspect-video w-full object-cover" loading="lazy" />
              <div className="absolute bottom-4 left-4 max-w-[62%] rounded-2xl bg-white/85 p-4 backdrop-blur-sm">
                <h3 className="text-base font-bold text-brand-blue">{a.name}</h3>
                <p className="mt-1 text-xs leading-snug text-black/70">{a.text}</p>
                <div className="mt-3 flex items-center gap-3 text-black/60">
                  <Wind className="size-4" />
                  <Wifi className="size-4" />
                  <Tv className="size-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Link to="/checkout" search={{}} className={blueBtn}>
            Reservar acomodação
          </Link>
        </div>
      </div>
    </section>
  );
}

function Esg() {
  return (
    <section className="grid md:grid-cols-2">
      <img src={IMG.esg} alt="Sustentabilidade no La Torre" className="h-64 w-full object-cover md:h-full" loading="lazy" />
      <div className="flex flex-col justify-center bg-brand-olive px-6 py-12 text-brand-ink md:px-12 lg:px-16">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Viva as melhores experiências hoje em um lugar que se preocupa com o amanhã! Somos ESG.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed">
          Você também sonha com um mundo mais sustentável? Aproveite as suas férias em um lugar que
          incentiva o ecoturismo, se preocupa com o meio ambiente e com o bem-estar dos hóspedes,
          colaboradores e sociedade ao redor. Possuímos parceria com organizações que estão inovando com
          importantes iniciativas ESG para um mundo melhor e você pode fazer parte dessa aliança conosco.
          Conheça todas as nossas ações e boas práticas sustentáveis.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-6">
          <button type="button" className={`${outlineBtn} border-white bg-white`}>
            Saiba mais
          </button>
          <img src={IMG.lixoZero} alt="Certificação Lixo Zero" className="h-10 w-auto" loading="lazy" />
          <img src={IMG.carbonoNeutro} alt="Empresa Carbono Neutro" className="h-16 w-auto" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [sent, setSent] = useState(false);
  return (
    <section className="py-12 md:py-16">
      <div className="container-lt">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:gap-5 md:p-8"
        >
          <p className="max-w-xs text-center text-[15px] font-semibold text-brand-blue md:text-left">
            Cadastre-se e receba com exclusividade nossas ofertas:
          </p>
          <input
            required
            placeholder="Seu nome"
            aria-label="Seu nome"
            className="min-h-12 w-full rounded-xl bg-black/5 px-4 text-[15px] outline-none md:flex-1"
          />
          <input
            required
            type="email"
            placeholder="Seu melhor e-mail"
            aria-label="Seu e-mail"
            className="min-h-12 w-full rounded-xl bg-black/5 px-4 text-[15px] outline-none md:flex-1"
          />
          <input
            placeholder="Whatsapp"
            aria-label="Whatsapp"
            className="min-h-12 w-full rounded-xl bg-black/5 px-4 text-[15px] outline-none md:flex-1"
          />
          <button
            type="submit"
            className="min-h-12 w-full rounded-xl bg-brand-blue px-6 text-[15px] font-semibold text-white transition-transform hover:brightness-110 active:scale-[0.98] md:w-auto"
          >
            {sent ? "Cadastrado!" : "Cadastrar"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Qualidade() {
  return (
    <section className="pb-12">
      <SectionTitle title="Nosso compromisso com a qualidade" subtitle="" />
      <div className="container-lt mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-emerald-700">Tripadvisor</p>
          <p className="mt-2 text-lg font-bold text-brand-navy underline">Resort La Torre</p>
          <p className="mt-2 text-xs text-black/60">Avaliações recentes dos viajantes</p>
          <ul className="mt-2 space-y-1 text-xs text-black/70">
            <li>“La Torre Hotel Maravilhoso!!!”</li>
            <li>“Excelente”</li>
            <li>“Recomendo 100%”</li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <p className="text-[15px] font-medium text-black/70">Comentários do Google</p>
          <p className="mt-1 flex items-center gap-2 text-3xl font-bold text-brand-navy">
            4.7
            <span className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-4 fill-brand-amber text-brand-amber" />
              ))}
            </span>
          </p>
          <p className="mt-1 text-xs text-black/55">Com base em 9804 revisões</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <img src={IMG.greatPlace} alt="Great Place To Work" className="h-20 w-auto" loading="lazy" />
        </div>
      </div>

      <SectionTitle title="Nosso compromisso com Você" subtitle="" />
      <div className="container-lt mt-8 flex flex-wrap items-center justify-center gap-10">
        <img src={IMG.greatPlace} alt="Great Place To Work Certificada" className="h-20 w-auto" loading="lazy" />
        <img src={IMG.esgLogo} alt="ESG Environmental Social Governance" className="h-16 w-auto" loading="lazy" />
        <img src={IMG.amigoAutista} alt="Amigo do Autista" className="h-16 w-auto" loading="lazy" />
      </div>
    </section>
  );
}

function Revista() {
  return (
    <section className="container-lt pb-14">
      <a href="#" className="block overflow-hidden rounded-2xl shadow-sm">
        <img
          src={IMG.revista}
          alt="Clique e conheça nossa revista La Torre"
          className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          loading="lazy"
        />
      </a>
    </section>
  );
}
