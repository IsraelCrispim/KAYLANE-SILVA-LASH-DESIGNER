export type LashService = {
  name: string;
  eyebrow: string;
  description: string;
  duration: string;
  maintenance: string;
  intensity: "Natural" | "Equilibrado" | "Marcante" | "Glamour";
};

export const services: LashService[] = [
  {
    name: "Clássico fio a fio",
    eyebrow: "Leveza essencial",
    description:
      "Um fio de extensão para cada cílio natural. Entrega definição delicada, acabamento limpo e um efeito elegante para todos os dias.",
    duration: "1h40 — 2h",
    maintenance: "15 — 20 dias",
    intensity: "Natural",
  },
  {
    name: "Volume brasileiro",
    eyebrow: "Textura equilibrada",
    description:
      "Fios em formato especial criam mais preenchimento sem perder suavidade. Ideal para quem quer presença com aparência leve.",
    duration: "1h50 — 2h10",
    maintenance: "15 — 20 dias",
    intensity: "Equilibrado",
  },
  {
    name: "Volume egípcio",
    eyebrow: "Definição sofisticada",
    description:
      "Combina fios finos em um desenho marcante e bem distribuído. Valoriza o contorno dos olhos com densidade na medida.",
    duration: "2h — 2h20",
    maintenance: "15 — 20 dias",
    intensity: "Marcante",
  },
  {
    name: "Volume russo",
    eyebrow: "Densidade personalizada",
    description:
      "Leques leves e feitos sob medida oferecem preenchimento uniforme, maciez e um olhar expressivo sem pesar.",
    duration: "2h10 — 2h40",
    maintenance: "15 — 20 dias",
    intensity: "Glamour",
  },
  {
    name: "Mega volume",
    eyebrow: "Impacto editorial",
    description:
      "Para quem ama intensidade. O desenho é planejado para criar alto impacto visual com equilíbrio, simetria e conforto.",
    duration: "2h30 — 3h",
    maintenance: "15 — 20 dias",
    intensity: "Glamour",
  },
  {
    name: "Lash lifting",
    eyebrow: "Curvatura natural",
    description:
      "Realça os próprios fios com curvatura e alinhamento. Uma alternativa prática para destacar o olhar sem extensões.",
    duration: "1h — 1h20",
    maintenance: "Resultado gradual",
    intensity: "Natural",
  },
];

export const recommendations = {
  Natural: {
    service: "Clássico fio a fio",
    copy: "Definição delicada, leve e elegante — como acordar com uma boa máscara de cílios.",
  },
  Equilibrado: {
    service: "Volume brasileiro",
    copy: "Mais textura e preenchimento, mantendo um resultado versátil para a rotina.",
  },
  Marcante: {
    service: "Volume egípcio",
    copy: "Contorno evidente e sofisticado para destacar o formato natural dos olhos.",
  },
  Glamour: {
    service: "Volume russo",
    copy: "Densidade personalizada e acabamento glamouroso para um olhar protagonista.",
  },
} as const;

export const faqs = [
  {
    question: "Quanto tempo dura a extensão de cílios?",
    answer:
      "A retenção varia conforme o ciclo natural dos fios, a rotina e os cuidados em casa. Para manter o desenho cheio e uniforme, a manutenção costuma ser feita entre 15 e 20 dias.",
  },
  {
    question: "A extensão danifica os cílios naturais?",
    answer:
      "Quando o peso, o comprimento e a aplicação respeitam cada fio natural, o procedimento é pensado para preservar sua saúde. Por isso, o mapeamento individual e a técnica profissional são essenciais.",
  },
  {
    question: "O procedimento dói ou incomoda?",
    answer:
      "A aplicação é feita com os olhos fechados e deve ser confortável. Qualquer sensibilidade precisa ser comunicada imediatamente para que o atendimento seja ajustado ou interrompido.",
  },
  {
    question: "Posso usar maquiagem normalmente?",
    answer:
      "Sim. Prefira produtos sem óleo na região dos olhos e evite máscara à prova d’água sobre as extensões. A higienização diária continua sendo indispensável.",
  },
  {
    question: "Como escolher o melhor efeito para mim?",
    answer:
      "Na consulta inicial avaliamos formato dos olhos, direção dos fios, estilo pessoal e rotina. O mapeamento é desenhado para valorizar sua beleza — não para copiar um modelo pronto.",
  },
  {
    question: "O que fazer antes do atendimento?",
    answer:
      "Chegue sem maquiagem nos olhos e, se possível, evite cafeína em excesso no dia. Informe alergias, sensibilidades, procedimentos recentes ou qualquer desconforto na região ocular.",
  },
];

export const gallery = [
  {
    src: "https://images.pexels.com/photos/5128234/pexels-photo-5128234.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Aplicação profissional de extensão de cílios com pinças",
    label: "Precisão",
  },
  {
    src: "https://images.pexels.com/photos/10698006/pexels-photo-10698006.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Retrato feminino com cílios definidos",
    label: "Leveza",
  },
  {
    src: "https://images.pexels.com/photos/7755531/pexels-photo-7755531.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Lash designer realizando aplicação em cliente",
    label: "Cuidado",
  },
  {
    src: "https://images.pexels.com/photos/7588357/pexels-photo-7588357.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Detalhe de olho feminino com maquiagem elegante",
    label: "Definição",
  },
  {
    src: "https://images.pexels.com/photos/7755523/pexels-photo-7755523.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Detalhe das mãos de uma profissional de cílios",
    label: "Técnica",
  },
  {
    src: "https://images.pexels.com/photos/1435443/pexels-photo-1435443.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Retrato editorial destacando cílios marcantes",
    label: "Expressão",
  },
];

export const testimonials = [
  {
    quote:
      "O resultado ficou elegante e muito confortável. Pela primeira vez senti que o desenho realmente combinou com os meus olhos.",
    name: "Marina A.",
    service: "Volume brasileiro",
  },
  {
    quote:
      "Atendimento calmo, explicação de cada etapa e um cuidado impecável. Saí me sentindo linda sem parecer artificial.",
    name: "Camila R.",
    service: "Clássico fio a fio",
  },
  {
    quote:
      "A manutenção foi tranquila e a retenção me surpreendeu. O mapeamento deixou meu olhar mais aberto exatamente como eu queria.",
    name: "Bruna S.",
    service: "Volume egípcio",
  },
];
