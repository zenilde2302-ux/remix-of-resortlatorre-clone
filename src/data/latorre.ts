export const IMG = {
  logo: "https://storage.googleapis.com/api-booking/cms/imagens/6a20f0ad61eba2d662081454d222e2d013d4aebbf009a33d3106a6e41e68f607aecb3aa79c640b402534931bb2fe81c8409fff765a25dafdfb539b11b2e1bbaf.svg",
  heroDesktop:
    "https://storage.googleapis.com/api-booking/cms/imagens/6e8b1a5cb5162ba1c0508be7f772ae49.webp",
  heroMobile:
    "https://storage.googleapis.com/api-booking/cms/imagens/c09ebe457ea70a6620fae70473975ee1.webp",
  bannerDezembro:
    "https://storage.googleapis.com/api-booking/assets/03bdf89b9b47183dd1fa3005f8ad32e1-1788969232598.webp",
  bannerJaneiro:
    "https://storage.googleapis.com/api-booking/assets/5a9b7de210f45d8ea327fcdbc46f64b7-1788969235579.webp",
  esg: "https://storage.googleapis.com/api-booking/assets/91146b85caf827e2c695aaea6d3b1c4f-1765908397485.webp",
  revista:
    "https://storage.googleapis.com/api-booking/assets/bff8d36b8e73f7574e5e34b4ed029d05-1698675119323.jpeg",
  lixoZero:
    "https://storage.googleapis.com/api-booking/assets/84c3452a310a91d202a1fbfd0592744e-1747678138698.svg",
  carbonoNeutro:
    "https://storage.googleapis.com/api-booking/assets/c2442ebd83e69a78c887ecaa4e3f57c9-1769605437112.svg",
  esgLogo:
    "https://storage.googleapis.com/api-booking/assets/2fcf5c6018490224ad7c690f73907f63-1697049850957.png",
  greatPlace:
    "https://storage.googleapis.com/latorre/cms/imagens/517fb506d67d2b23587274be1b1e45a0888bfe2dc740fc80b91a480ca9203dbf46944b6155d42b029427c67e4e860a0e469837603b5d599bd8e136b9a7680e92.png",
  amigoAutista:
    "https://storage.googleapis.com/latorre/cms/imagens/8f890048ba5dfeb04525f2485fa9aa6d24c4f358c7b3b1e0bbbb8a6f8747edff6dd00f8bcf58fd958d1e711444aa7866be1087d5dc7bb4850376dc86004c21a4.png",
};

export type Promo = {
  slug: string;
  title: string;
  label: string;
  image: string;
  price: number;
  views: number;
};

export const PROMOS: Promo[] = [
  {
    slug: "janeiro-2027",
    label: "Janeiro 2027",
    title: "Dias de verão na Bahia para criar novas memórias inesquecíveis!",
    image: "https://storage.googleapis.com/api-booking/promotion/0d2abcc2f72d7ce71d83a2d7ffb9ab81.webp",
    price: 2312,
    views: 110318,
  },
  {
    slug: "natal-2026",
    label: "Natal 2026",
    title: "Viva uma experiência incrível de diversão e magia natalina em família.",
    image: "https://storage.googleapis.com/api-booking/promotion/008ef9fc419f10f1592d20291d9a1103.webp",
    price: 2202,
    views: 29933,
  },
  {
    slug: "reveillon-2027",
    label: "Réveillon La Torre",
    title: "Inicie o seu próximo ciclo com elegância, diversão e all inclusive!",
    image: "https://storage.googleapis.com/api-booking/promotion/09bc146c6f3a3ad000d3ae64929b7c53.webp",
    price: 3192,
    views: 55982,
  },
  {
    slug: "fevereiro-2027",
    label: "Fevereiro 2027",
    title: "Verão inesquecível na Bahia!",
    image: "https://storage.googleapis.com/api-booking/promotion/d3c6a81359811bd8564fb9132f61cd99.webp",
    price: 1777,
    views: 17526,
  },
];

export const DIFERENCIAIS = [
  {
    title: "All Inclusive Premium",
    text: "No Resort, sua experiência all inclusive é completa: acomodações, gastronomia e lazer integrados para uma estadia verdadeiramente excepcional.",
    image:
      "https://storage.googleapis.com/api-booking/assets/647ba4a1796fc17181b78024e4331067-1764012105175.webp",
  },
  {
    title: "Clube de Praia Exclusivo",
    text: "Os hóspedes desfrutam de acesso exclusivo ao nosso Clube de Praia privativo, com infraestrutura premium para um relaxamento sofisticado.",
    image:
      "https://storage.googleapis.com/api-booking/assets/68f055008fee75a06fc513c52d0a9a29-1764012834773.webp",
  },
  {
    title: "O La Torre é Pet Friendly",
    text: "O La Torre é pet friendly, onde você e seus animais de estimação desfrutam da experiência completa.",
    image:
      "https://storage.googleapis.com/api-booking/assets/54bf24ba04e8536d62cd9a550da6fee0-1764012120285.webp",
  },
  {
    title: "Um Resort Sustentável",
    text: "Com um forte compromisso sustentável e de boas práticas em ESG, o resort preserva o meio ambiente e beneficia a comunidade.",
    image:
      "https://storage.googleapis.com/api-booking/assets/c58825d7fcee8bffb9815594db87f693-1764012123105.webp",
  },
];

export const BADGES = [
  "https://storage.googleapis.com/api-booking/assets/766058435d694fc21dede4103ab1ae7f-1782236324648.svg",
  "https://storage.googleapis.com/api-booking/assets/55bc3048eb747dd273fb64d742d848b9-1782236894254.svg",
  "https://storage.googleapis.com/api-booking/assets/2ac6eb6a698f5dbe265cce6a89f7e651-1782236347764.svg",
  "https://storage.googleapis.com/api-booking/assets/7a6bd0bb9e0c0d8874e53ea166954d62-1782236460950.svg",
  "https://storage.googleapis.com/api-booking/assets/5636cbad07c8a911167d48dc0b2e693d-1782236464977.svg",
];

export const EXPERIENCIAS = [
  {
    label: "SETEMBRO 26",
    text: "Durante todo o mês de Setembro, as nossas manhãs e tardes do Park Lounge serão enfeitadas por uma super estrutura, onde haverá saltos, acrobacias e diversão genuína.",
    image:
      "https://storage.googleapis.com/api-booking/experience/b4c36ed7-1796-4cfc-84fb-38ab87da1ec4/acd428b944b8426466e67c079bddeec4.webp",
  },
  {
    label: "OUTUBRO 2026",
    text: "Viva essa mágica experiência circense, com apresentações surpreendentes e até oficinas para testar suas habilidades. Diversão em família garantida!",
    image:
      "https://storage.googleapis.com/api-booking/experience/9b26377d-6671-4680-ac78-629c7ae760aa/573cf025f5f64d7194bf736e9867c78b.jpg",
  },
  {
    label: "NOVEMBRO 2026",
    text: "Ativações com diversão para toda a familia durante todo o mês de Novembro.",
    image:
      "https://storage.googleapis.com/api-booking/experience/66bca73d-ff7c-4003-88e2-7610473cce29/8839a3d9d1b5488c38e18920f56a7fc6.webp",
  },
  {
    label: "VERÃO LA TORRE",
    text: "Dias de sol, praia e muita diversão na Bahia! Dá uma olhadinha nas experiências incríveis que te esperam por aqui.",
    image:
      "https://storage.googleapis.com/api-booking/experience/f6fa8233-2dc0-4fb4-b6d6-d24caa1bcc71/51d8036b4ebbc529df32c0d5dfd1dddf.webp",
  },
  {
    label: "03 DEZEMBRO",
    text: "Música, sabores e a energia da Bahia marcam a abertura da temporada de pré-verão.",
    image:
      "https://storage.googleapis.com/api-booking/experience/2079cc07-e4b5-4747-8f15-2d6f685c110b/ec640d008b5dbc699a806a076efcdc6b.webp",
  },
  {
    label: "NATAL",
    text: "Uma noite mágica em família espera por você",
    image:
      "https://storage.googleapis.com/api-booking/experience/cbe6f57f-59e7-45a0-b441-53c3c6b458c1/9370975698cf08b82e9187b322eca248.webp",
  },
  {
    label: "RÉVEILLON",
    text: "Um espetáculo inspirado no universo de Bruno Mars",
    image:
      "https://storage.googleapis.com/api-booking/experience/62b88adb-f6d2-4478-b03e-d19480714002/d98108c816857b6dabec92c54ef3df34.webp",
  },
  {
    label: "JANEIRO 2027",
    text: "Com acompanhamento de um guia, uma experiência completa de voar em um balão de ar quente, subindo até 20m de altura.",
    image:
      "https://storage.googleapis.com/api-booking/experience/09c7401b-6d81-45c2-9335-693c72f5d59a/ed865db281be40199e6560b19b965643.webp",
  },
];

export const ACOMODACOES = [
  {
    name: "STANDARD CASAL",
    text: "21 m2 com varanda e vista jardim e/ou piscina. Cama Casal.",
    image: "https://storage.googleapis.com/api-booking/accommodation/4003e5e6a388f981b2b88e09176654e5.jpg",
  },
  {
    name: "STANDARD DUPLO",
    text: "30m2 com varanda e vista jardim e/ou piscina.",
    image: "https://storage.googleapis.com/api-booking/accommodation/2c9c8e2148bc76314e1275600f63c402.jpg",
  },
  {
    name: "LUXO",
    text: "45m2 com varanda e rede, possui vista para a piscina central e/ou jardim.",
    image: "https://storage.googleapis.com/api-booking/accommodation/dd54d57b1151258a7529c27e18dc0aac.webp",
  },
  {
    name: "SUÍTE SUPERIOR",
    text: "60m2 com quarto em dois ambientes próximo a praia, possui vista piscina e/ou jardins.",
    image: "https://storage.googleapis.com/api-booking/accommodation/aa6c1a49a0cef19b7475efd3b6fa6f08.jpg",
  },
  {
    name: "SUÍTE FAMILY",
    text: "70m2 com 2 quartos, sala, varanda com rede e vista piscina e/ou jardim.",
    image: "https://storage.googleapis.com/api-booking/accommodation/5edf10d0ad7b16cf9c13c21664d6737d",
  },
  {
    name: "SUÍTE VILA",
    text: "100 m2 com 2 quartos, sala e mini cozinha, varanda com rede e vista jardim.",
    image: "https://storage.googleapis.com/api-booking/accommodation/c3cc338dd0540f38e14b30c4581c37ef.webp",
  },
  {
    name: "SUÍTE TOPÁZIO",
    text: "90m2 com 2 quartos, sala , varanda com rede e vista piscina e/ou jardim.",
    image: "https://storage.googleapis.com/api-booking/accommodation/30e8764b35a29dfb6122b946d3490f58.webp",
  },
  {
    name: "CASA DA PRAIA",
    text: "Casa de 180 m² com 3 quartos, 3 banheiros, sala de estar, área de jantar, cozinha completa e jardim privativo.",
    image: "https://storage.googleapis.com/api-booking/accommodation/7c06d4a31482bcc78a97ac81b895134d.webp",
  },
  {
    name: "CASA MUTÁ",
    text: "Casa de 150 m² com 2 pavimentos, suíte no andar superior, quarto no térreo, 2 banheiros, sala de estar, área de jantar, cozinha completa e jardim privativo.",
    image: "https://storage.googleapis.com/api-booking/accommodation/6370bb4e7b4376ee755e8f01eeffda2d.webp",
  },
  {
    name: "CASA MANGUEIRA",
    text: "Casa de 150 m² com suíte no piso superior, quarto no térreo, cozinha completa, sala de estar, área de jantar e jardim privativo.",
    image: "https://storage.googleapis.com/api-booking/accommodation/d309176b78e3f8cf417b733481a5b7d1.webp",
  },
  {
    name: "CASA ÁRVORE",
    text: "Casa térrea de 150 m² com 2 quartos, 2 banheiros, sala de estar, área de jantar, cozinha completa e jardim privativo.",
    image: "https://storage.googleapis.com/api-booking/accommodation/637a02568db57e4dfb82ca98108735de.webp",
  },
  {
    name: "VILA LA TORRE",
    text: "Vila La Torre 200m2 com Piscina Privativa, possui sala, 03 quartos, 03 banheiros e 02 pavimentos! varanda ampla.",
    image: "https://storage.googleapis.com/api-booking/accommodation/a75041514b0427f7e4d0dc22e75c8574",
  },
  {
    name: "APARTAMENTO ADAPTADO",
    text: "Com cerca de 30m² e vista para o jardim está localizado próximo às principais áreas sociais do Resort.",
    image: "https://storage.googleapis.com/api-booking/accommodation/d13a838a6666fc046e11a43596d1c49a.jpg",
  },
];

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });
