import { Link } from "@tanstack/react-router";
import { Briefcase, Menu, UserCircle2, X } from "lucide-react";
import { useState } from "react";
import { IMG } from "@/data/latorre";

const NAV = [
  { label: "Promoções", to: "/", hash: "promocoes" },
  { label: "Experiências", to: "/", hash: "experiencias" },
  { label: "Acomodações", to: "/", hash: "acomodacoes" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white">
      <div className="container-lt flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="shrink-0" aria-label="Resort La Torre - All Inclusive">
          <img src={IMG.logo} alt="Resort La Torre - All Inclusive" className="h-10 w-auto md:h-12" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className="text-[15px] font-medium text-brand-ink transition-colors hover:text-brand-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <Link
            to="/checkout"
            className="hidden items-center gap-2 text-[15px] font-medium text-brand-ink transition-colors hover:text-brand-blue sm:flex"
          >
            Entrar
            <UserCircle2 className="size-6" strokeWidth={1.6} />
          </Link>
          <Link
            to="/checkout"
            aria-label="Carrinho"
            className="relative rounded-full p-1.5 text-brand-ink transition-colors hover:bg-black/5"
          >
            <Briefcase className="size-6" strokeWidth={1.6} />
          </Link>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-1.5 text-brand-ink transition-colors hover:bg-black/5"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white lg:pb-2">
          <div className="container-lt flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-[15px] font-medium text-brand-ink transition-colors hover:bg-black/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-[15px] font-semibold text-brand-blue transition-colors hover:bg-black/5"
            >
              Ir para o checkout
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
