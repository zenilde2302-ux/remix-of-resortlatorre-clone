import { Facebook, Instagram, Music2, Twitter, Youtube } from "lucide-react";
import { IMG } from "@/data/latorre";

const SOCIAL = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Music2, label: "TikTok" },
];

const LINKS = ["Perguntas Frequentes", "Política de Privacidade", "Trabalhe Conosco", "Pet Friendly"];

export function Footer() {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="container-lt py-12">
        <div className="grid gap-10 text-center md:grid-cols-3 md:items-center md:text-left">
          <div className="space-y-1 text-[15px] md:text-right md:order-1">
            <p>Av. Beira Mar, 9999</p>
            <p>Praia do Mutá</p>
            <p>Porto Seguro - BA</p>
            <p>+55 73 2105-1700</p>
          </div>

          <div className="flex justify-center md:order-2">
            <img src={IMG.logo} alt="Resort La Torre" className="h-20 w-auto brightness-0 invert" />
          </div>

          <div className="space-y-1 text-[15px] md:order-3">
            <p className="font-semibold">Central de Vendas</p>
            <p>+55 73 3083-4901</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {SOCIAL.map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="rounded-full p-2 transition-colors hover:bg-white/15"
            >
              <Icon className="size-6" />
            </a>
          ))}
        </div>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px]">
          {LINKS.map((l) => (
            <a key={l} href="#" className="transition-opacity hover:opacity-75">
              {l}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
