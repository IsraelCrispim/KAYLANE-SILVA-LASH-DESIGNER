"use client";

import {
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  Clock3,
  Eye,
  Heart,
  Menu,
  MessageCircle,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Volume2,
  VolumeX,
  WandSparkles,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  faqs,
  gallery,
  recommendations,
  services,
  testimonials,
} from "@/data/site";

type Preference = keyof typeof recommendations;

const navItems = [
  ["Sobre", "sobre"],
  ["Serviços", "servicos"],
  ["Experiência", "experiencia"],
  ["Cuidados", "cuidados"],
  ["Dúvidas", "duvidas"],
] as const;

const WHATSAPP_NUMBER = "5513996031091";
const INSTAGRAM_URL = "https://www.instagram.com/ks_lashdesig/";

const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="Kaylane Silva Lash Designer — início">
      <span className="brand__logo">
        <img src="/assets/kaylane-silva-logo.png" alt="Logo Kaylane Silva" />
      </span>
      <span className="brand__name">
        <strong>KAYLANE SILVA</strong>
        <small>LASH DESIGNER</small>
      </span>
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-intro${light ? " section-intro--light" : ""}`} data-reveal>
      <span className="eyebrow">
        <Sparkles size={14} aria-hidden="true" /> {eyebrow}
      </span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function ScrollVideo({
  src,
  poster,
  kicker,
  title,
  description,
}: {
  src: string;
  poster: string;
  kicker: string;
  title: string;
  description: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reducedMotion) {
          video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <article className="video-card" data-reveal>
      <video
        ref={videoRef}
        className="video-card__media"
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="none"
        aria-label={`${title}: vídeo do procedimento de extensão de cílios`}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="video-card__shade" aria-hidden="true" />
      <div className="video-card__controls">
        <button type="button" onClick={togglePlayback} aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}>
          {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
        </button>
        <button type="button" onClick={toggleSound} aria-label={muted ? "Ativar som" : "Desativar som"}>
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
      <div className="video-card__copy">
        <span>{kicker}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default function LashLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [preference, setPreference] = useState<Preference>("Equilibrado");
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: "", service: "", period: "" });
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      items.forEach((item) => item.classList.add("is-visible"));
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );
    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const service = form.service || "uma avaliação personalizada";
    const period = form.period || "a combinar";
    const message = `Olá, Kaylane! Meu nome é ${form.name}. Conheci seu trabalho pelo site e gostaria de agendar ${service}. Minha preferência de horário é: ${period}. Pode me enviar as disponibilidades?`;
    setFormStatus("Mensagem pronta — abrindo o WhatsApp.");
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  const selectedRecommendation = recommendations[preference];

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <div className="announcement">
        <span>Kaylane Silva • Lash Designer</span>
        <i aria-hidden="true" />
        <span>Agenda aberta</span>
        <i aria-hidden="true" />
        <span>Experiência exclusiva</span>
      </div>

      <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
        <div className="container site-header__inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`}>{label}</a>
            ))}
          </nav>
          <a
            className="button button--small header-cta"
            href={whatsappUrl("Olá, Kaylane! Vim pelo seu site e gostaria de agendar um horário para extensão de cílios. Pode me enviar as disponibilidades?")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar horário <ArrowRight size={15} aria-hidden="true" />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`}>
          <nav className="container" aria-label="Navegação móvel">
            {navItems.map(([label, id], index) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span> {label}
              </a>
            ))}
            <a
              className="button"
              href={whatsappUrl("Olá, Kaylane! Vim pelo seu site e gostaria de agendar uma avaliação para descobrir o efeito ideal para mim.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Agendar avaliação <ArrowRight size={16} />
            </a>
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero__orb hero__orb--one" aria-hidden="true" />
          <div className="hero__orb hero__orb--two" aria-hidden="true" />
          <div className="container hero__inner">
            <div className="row hero__row">
              <div className="col-lg-6 hero__content" data-reveal>
                <span className="eyebrow">
                  <WandSparkles size={14} aria-hidden="true" /> Kaylane Silva • Lash Designer
                </span>
                <h1>Seu olhar, elevado à sua <em>melhor versão.</em></h1>
                <p className="hero__lead">
                  Mapeamentos exclusivos, técnica delicada e acabamento impecável para realçar sua beleza sem apagar quem você é.
                </p>
                <div className="hero__actions">
                  <a
                    className="button"
                    href={whatsappUrl("Olá, Kaylane! Conheci seu trabalho pelo site e quero agendar meu horário. Pode me enviar as disponibilidades?")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Quero meu horário <ArrowRight size={17} aria-hidden="true" />
                  </a>
                  <a className="text-link" href="#servicos">
                    Conhecer os efeitos <span aria-hidden="true">↘</span>
                  </a>
                </div>
                <div className="hero__trust">
                  <span><ShieldCheck size={17} /> Protocolo cuidadoso</span>
                  <span><Heart size={17} /> Design personalizado</span>
                  <span><Sparkles size={17} /> Acabamento leve</span>
                </div>
              </div>

              <div className="col-lg-6 hero__visual" data-reveal>
                <div className="hero-photo">
                  <img
                    src="https://images.pexels.com/photos/5128234/pexels-photo-5128234.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Lash designer aplicando extensão de cílios com precisão"
                    fetchPriority="high"
                  />
                  <span className="hero-photo__line" aria-hidden="true" />
                  <div className="hero-photo__tag">
                    <Sparkles size={16} />
                    <span><small>Design</small> sob medida</span>
                  </div>
                </div>
                <div className="hero-mini-photo">
                  <img
                    src="https://images.pexels.com/photos/10698006/pexels-photo-10698006.jpeg?auto=compress&cs=tinysrgb&w=700"
                    alt="Olhar feminino com cílios definidos e naturais"
                  />
                </div>
                <div className="hero-review">
                  <div className="hero-review__stars" aria-label="Cinco estrelas">
                    {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={12} fill="currentColor" />)}
                  </div>
                  <strong>Detalhes que fazem você se sentir única.</strong>
                  <span>Atendimento individual</span>
                </div>
              </div>
            </div>
          </div>
          <a className="hero__scroll" href="#sobre" aria-label="Rolar para a próxima seção">
            <span>Explore</span><i aria-hidden="true" />
          </a>
        </section>

        <div className="marquee" aria-label="Especialidades">
          <div className="marquee__track">
            {["Clássico fio a fio", "Volume brasileiro", "Volume egípcio", "Volume russo", "Lash lifting", "Mapeamento exclusivo", "Clássico fio a fio", "Volume brasileiro"].map((item, index) => (
              <span key={`${item}-${index}`}><Sparkles size={13} /> {item}</span>
            ))}
          </div>
        </div>

        <section className="section about" id="sobre">
          <div className="container">
            <div className="row about__row">
              <div className="col-lg-6 about__visual" data-reveal>
                <div className="about__image-main">
                  <img
                    src="https://images.pexels.com/photos/7755531/pexels-photo-7755531.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Profissional realizando um procedimento de extensão de cílios"
                    loading="lazy"
                  />
                </div>
                <div className="about__image-detail">
                  <img
                    src="https://images.pexels.com/photos/7755523/pexels-photo-7755523.jpeg?auto=compress&cs=tinysrgb&w=700"
                    alt="Detalhe de pinças usadas na aplicação de cílios"
                    loading="lazy"
                  />
                </div>
                <div className="about__seal" aria-hidden="true">
                  <span>BELEZA</span><strong>×</strong><span>TÉCNICA</span>
                </div>
              </div>
              <div className="col-lg-6 about__content">
                <SectionIntro
                  eyebrow="Conheça Kaylane Silva"
                  title="Não é apenas sobre cílios. É sobre como você se sente ao se olhar."
                />
                <p data-reveal>
                  Kaylane Silva une percepção estética, precisão e escuta em cada atendimento. Antes da aplicação, ela observa proporções, direção dos fios, formato dos olhos e o resultado que você deseja comunicar.
                </p>
                <p data-reveal>
                  O resultado é um desenho exclusivo: leve quando você quer naturalidade, intenso quando você quer presença — sempre respeitando sua identidade.
                </p>
                <div className="about__values" data-reveal>
                  <div><span>01</span><strong>Consulta visual</strong><small>Entendemos seu estilo e sua rotina.</small></div>
                  <div><span>02</span><strong>Mapeamento</strong><small>Desenhamos o efeito para seus olhos.</small></div>
                  <div><span>03</span><strong>Aplicação</strong><small>Executamos com calma e precisão.</small></div>
                </div>
                <a className="text-link text-link--dark" href="#metodo">
                  Conheça a experiência completa <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section services" id="servicos">
          <div className="container">
            <div className="services__heading">
              <SectionIntro
                eyebrow="Menu de serviços"
                title="Um efeito para cada forma de se expressar."
                text="Do resultado mais discreto ao olhar mais intenso, cada técnica é adaptada à estrutura e à saúde dos seus fios naturais."
              />
              <a
                className="text-link text-link--dark"
                href={whatsappUrl("Olá, Kaylane! Gostaria de agendar uma avaliação e receber sua recomendação para escolher o melhor efeito de cílios para mim.")}
                target="_blank"
                rel="noopener noreferrer"
              >Agendar avaliação <span>→</span></a>
            </div>
            <div className="services-grid">
              {services.map((service, index) => (
                <article className="service-card" key={service.name} data-reveal>
                  <div className="service-card__top">
                    <span className="service-card__number">0{index + 1}</span>
                    <span className="service-card__intensity">{service.intensity}</span>
                  </div>
                  <div className="service-card__icon" aria-hidden="true"><Eye size={25} strokeWidth={1.25} /></div>
                  <span className="service-card__eyebrow">{service.eyebrow}</span>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="service-card__meta">
                    <span><Clock3 size={15} /> {service.duration}</span>
                    <span><CalendarDays size={15} /> {service.maintenance}</span>
                  </div>
                  <a
                    href={whatsappUrl(`Olá, Kaylane! Vi o serviço ${service.name} no seu site e gostaria de saber mais e agendar um horário.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Quero este efeito <ArrowRight size={16} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="style-finder">
          <div className="container style-finder__inner">
            <div className="style-finder__copy" data-reveal>
              <span className="eyebrow"><Sparkles size={14} /> Guia de estilo</span>
              <h2>Como você quer se sentir com o seu novo olhar?</h2>
              <p>Escolha uma intenção e veja o ponto de partida que mais combina com você.</p>
            </div>
            <div className="style-finder__tool" data-reveal>
              <div className="style-finder__options" role="group" aria-label="Escolha a intensidade desejada">
                {(Object.keys(recommendations) as Preference[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={preference === item ? "is-active" : ""}
                    onClick={() => setPreference(item)}
                    aria-pressed={preference === item}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="recommendation" aria-live="polite">
                <div className="recommendation__icon"><WandSparkles size={26} /></div>
                <div>
                  <span>Nossa sugestão inicial</span>
                  <h3>{selectedRecommendation.service}</h3>
                  <p>{selectedRecommendation.copy}</p>
                </div>
                <a
                  href={whatsappUrl(`Olá, Kaylane! Fiz o guia de estilo no seu site e recebi ${selectedRecommendation.service} como sugestão. Gostaria de saber mais e agendar.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Agendar ${selectedRecommendation.service}`}
                >
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section experience" id="experiencia">
          <div className="container">
            <div className="experience__head">
              <SectionIntro
                eyebrow="Por dentro da experiência"
                title="Precisão que você pode ver. Cuidado que você pode sentir."
                text="Os vídeos começam suavemente quando entram na tela, mostrando a delicadeza por trás de cada etapa."
                light
              />
              <span className="experience__hint"><Play size={12} fill="currentColor" /> Reprodução ao rolar</span>
            </div>
            <div className="video-grid">
              <ScrollVideo
                src="https://videos.pexels.com/video-files/7754506/7754506-hd_1920_1080_30fps.mp4"
                poster="https://images.pexels.com/videos/7754506/pexels-photo-7754506.jpeg?auto=compress&h=900&w=1400"
                kicker="01 — Aplicação"
                title="Precisão em cada fio"
                description="Isolamento cuidadoso e aplicação controlada para um acabamento leve e uniforme."
              />
              <ScrollVideo
                src="https://videos.pexels.com/video-files/19892854/19892854-uhd_2160_3840_60fps.mp4"
                poster="https://images.pexels.com/videos/19892854/pexels-photo-19892854.jpeg?auto=compress&h=1100&w=900"
                kicker="02 — Detalhes"
                title="Arte em pequena escala"
                description="Cada escolha — curvatura, direção e comprimento — participa do resultado final."
              />
            </div>
          </div>
        </section>

        <section className="section method" id="metodo">
          <div className="container">
            <SectionIntro
              eyebrow="Do primeiro olhar ao resultado"
              title="Uma experiência pensada nos mínimos detalhes."
              text="Você sabe o que acontece em cada etapa e participa das escolhas do seu novo olhar."
            />
            <div className="method-grid">
              {[
                ["01", "Consulta & escuta", "Conversamos sobre rotina, referências, preferências e sensibilidades antes de qualquer escolha."],
                ["02", "Mapeamento exclusivo", "Analisamos proporções e desenhamos comprimentos, curvaturas e direção para o efeito desejado."],
                ["03", "Aplicação delicada", "Com os olhos fechados, cada extensão é aplicada com atenção ao isolamento e ao conforto."],
                ["04", "Finalização & cuidado", "Conferimos simetria, orientamos a manutenção e entregamos uma rotina simples de cuidados."],
              ].map(([number, title, copy]) => (
                <article className="method-step" key={number} data-reveal>
                  <span>{number}</span>
                  <div className="method-step__line" aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section gallery-section">
          <div className="container">
            <div className="gallery-section__head">
              <SectionIntro
                eyebrow="Referências de efeitos"
                title="Olhares únicos. Beleza sem fórmula pronta."
                text="Inspirações visuais para conversar sobre intensidade, textura e acabamento na sua avaliação."
              />
              <div className="gallery-section__note"><Eye size={18} /> O resultado varia em cada pessoa.</div>
            </div>
            <div className="lash-gallery">
              {gallery.map((image, index) => (
                <figure className={`lash-gallery__item lash-gallery__item--${index + 1}`} key={image.src} data-reveal>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <figcaption><span>0{index + 1}</span>{image.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section aftercare" id="cuidados">
          <div className="container aftercare__inner">
            <div className="aftercare__visual" data-reveal>
              <img
                src="https://images.pexels.com/photos/7588357/pexels-photo-7588357.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Detalhe de olho feminino com cílios bem cuidados"
                loading="lazy"
              />
              <div className="aftercare__badge"><ShieldCheck size={24} /><span>Seu cuidado prolonga o resultado.</span></div>
            </div>
            <div className="aftercare__content">
              <SectionIntro
                eyebrow="Cuidados pós-procedimento"
                title="Cílios bonitos também fazem parte da sua rotina de autocuidado."
                text="Pequenos hábitos ajudam a manter a região limpa, confortável e com o desenho bonito por mais tempo."
              />
              <ul className="care-list" data-reveal>
                {[
                  "Higienize diariamente com produto indicado para a região dos olhos.",
                  "Seque com delicadeza e penteie os fios sem puxar.",
                  "Evite produtos oleosos diretamente sobre as extensões.",
                  "Não esfregue, puxe ou tente remover os fios em casa.",
                  "Faça a manutenção dentro do intervalo recomendado.",
                ].map((item) => <li key={item}><Check size={17} /> {item}</li>)}
              </ul>
              <div className="aftercare__note" data-reveal>
                <Sparkles size={18} />
                <p><strong>Dica da Kaylane</strong> Higienizar não reduz a retenção — a limpeza correta faz parte de um cuidado saudável.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section testimonials">
          <div className="container">
            <div className="testimonials__head">
              <SectionIntro
                eyebrow="Experiências que ficam"
                title="A melhor assinatura é se reconhecer no espelho."
              />
              <div className="testimonials__rating" data-reveal>
                <strong>5.0</strong>
                <span>{[0, 1, 2, 3, 4].map((star) => <Star key={star} size={14} fill="currentColor" />)}</span>
                <small>Avaliações demonstrativas</small>
              </div>
            </div>
            <div className="testimonial-grid">
              {testimonials.map((testimonial, index) => (
                <article className="testimonial-card" key={testimonial.name} data-reveal>
                  <span className="testimonial-card__quote" aria-hidden="true">“</span>
                  <div className="testimonial-card__stars" aria-label="Cinco estrelas">
                    {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={13} fill="currentColor" />)}
                  </div>
                  <blockquote>{testimonial.quote}</blockquote>
                  <footer>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><strong>{testimonial.name}</strong><small>{testimonial.service}</small></div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section faq-section" id="duvidas">
          <div className="container faq-section__inner">
            <div className="faq-section__intro">
              <SectionIntro
                eyebrow="Antes de agendar"
                title="Dúvidas comuns, respostas transparentes."
                text="Informação também é cuidado. Se sua pergunta não estiver aqui, fale conosco antes do atendimento."
              />
              <a
                className="button button--outline"
                href={whatsappUrl("Olá, Kaylane! Estou no seu site e gostaria de tirar uma dúvida antes de agendar meu atendimento.")}
                target="_blank"
                rel="noopener noreferrer"
              ><MessageCircle size={17} /> Falar sobre meu caso</a>
            </div>
            <div className="faq-list" data-reveal>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <article className={`faq-item${isOpen ? " faq-item--open" : ""}`} key={faq.question}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${index}`}
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      >
                        <span><small>0{index + 1}</small>{faq.question}</span>
                        <ChevronDown size={19} />
                      </button>
                    </h3>
                    <div className="faq-item__answer" id={`faq-answer-${index}`} hidden={!isOpen}>
                      <p>{faq.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="booking" id="agendar">
          <div className="booking__image" aria-hidden="true">
            <img
              src="https://images.pexels.com/photos/10658352/pexels-photo-10658352.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="booking__overlay" aria-hidden="true" />
          <div className="container booking__inner">
            <div className="booking__copy" data-reveal>
              <span className="eyebrow"><Sparkles size={14} /> Seu momento começa aqui</span>
              <h2>Pronta para descobrir o desenho ideal para o seu olhar?</h2>
              <p>Conte o que você procura. Sua mensagem será preparada para falar diretamente com Kaylane pelo WhatsApp.</p>
              <div className="booking__features">
                <span><Check size={15} /> Avaliação personalizada</span>
                <span><Check size={15} /> Escolha do efeito em conjunto</span>
                <span><Check size={15} /> Orientações de cuidado</span>
              </div>
            </div>
            <form className="booking-form" onSubmit={submitBooking} data-reveal>
              <div className="booking-form__head">
                <span>Solicitar atendimento</span>
                <MessageCircle size={21} />
              </div>
              <label>
                <span>Como podemos chamar você?</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Seu nome"
                  autoComplete="name"
                  required
                />
              </label>
              <label>
                <span>Qual serviço chamou sua atenção?</span>
                <select
                  value={form.service}
                  onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))}
                >
                  <option value="">Quero uma recomendação</option>
                  {services.map((service) => <option key={service.name} value={service.name}>{service.name}</option>)}
                </select>
              </label>
              <label>
                <span>Qual período funciona melhor?</span>
                <select
                  value={form.period}
                  onChange={(event) => setForm((current) => ({ ...current, period: event.target.value }))}
                >
                  <option value="">A combinar</option>
                  <option value="manhã">Manhã</option>
                  <option value="tarde">Tarde</option>
                  <option value="início da noite">Início da noite</option>
                </select>
              </label>
              <button className="button" type="submit">
                Preparar mensagem <ArrowRight size={17} />
              </button>
              <small>O WhatsApp abrirá com a mensagem pronta para você enviar.</small>
              {formStatus ? <p className="booking-form__status" role="status">{formStatus}</p> : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__top">
          <div className="site-footer__brand">
            <Brand />
            <p>Kaylane Silva transforma técnica e sensibilidade em um design de cílios que respeita sua individualidade.</p>
          </div>
          <div className="site-footer__nav">
            <span>Explore</span>
            {navItems.slice(0, 4).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </div>
          <div className="site-footer__contact">
            <span>Atendimento</span>
            <p>Com hora marcada</p>
            <a
              href={whatsappUrl("Olá, Kaylane! Vim pelo seu site e gostaria de consultar os horários disponíveis para atendimento.")}
              target="_blank"
              rel="noopener noreferrer"
            ><MessageCircle size={15} /> (13) 99603-1091</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><Camera size={15} /> @ks_lashdesig</a>
          </div>
          <div className="site-footer__signature">
            <Eye size={38} strokeWidth={1} />
            <p>Seu olhar.<br />Sua assinatura.</p>
          </div>
        </div>
        <div className="container site-footer__bottom">
          <span>© {new Date().getFullYear()} Kaylane Silva • Lash Designer</span>
          <span>Imagens e vídeos demonstrativos: <a href="https://www.pexels.com/" target="_blank" rel="noreferrer">Pexels</a></span>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={whatsappUrl("Olá, Kaylane! Vim pelo seu site e gostaria de saber quais horários estão disponíveis para agendamento.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar com Kaylane pelo WhatsApp"
      >
        <MessageCircle size={22} fill="currentColor" />
        <span>Agendar</span>
      </a>
    </>
  );
}
