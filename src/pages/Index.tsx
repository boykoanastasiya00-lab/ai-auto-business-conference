import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "О конференции", href: "#about" },
  { label: "Программа", href: "#program" },
  { label: "Спикеры", href: "#speakers" },
  { label: "Партнёры", href: "#partners" },
  { label: "Для спикеров", href: "#for-speakers" },
  { label: "Для партнёров", href: "#for-partners" },
  { label: "Контакты", href: "#contacts" },
];

const ROLES = [
  {
    icon: "TrendingUp",
    title: "Собственникам и гендиректорам",
    points: [
      "Как перестроить бизнес-модель под новую реальность",
      "Где искать маржу, когда продажи падают",
    ],
  },
  {
    icon: "BarChart2",
    title: "Коммерческим директорам и руководителям продаж",
    points: [
      "ИИ-инструменты для роста конверсии",
      "Автоматизация рутины менеджеров",
    ],
  },
  {
    icon: "Wrench",
    title: "Руководителям сервиса",
    points: [
      "Предиктивный сервис и управление запчастями",
      "Как поднять апсейл без допнагрузки на мастеров",
    ],
  },
  {
    icon: "Cpu",
    title: "ИТ-директорам и HR",
    points: [
      "Интеграция ИИ в существующие системы",
      "Обучение команды и работа с сопротивлением",
    ],
  },
];

const SPEAKERS = [
  {
    name: "Александр Петров",
    role: "CTO",
    company: "Чанган Моторс Россия",
    topic: "Основные системные ошибки и смена парадигмы",
    bio: "Более 15 лет в автомобильной отрасли. Руководит цифровой трансформацией одного из ключевых китайских брендов на российском рынке.",
    initials: "АП",
    color: "#9D4EDD",
  },
  {
    name: "Мария Иванова",
    role: "Директор по ИИ",
    company: "Джили Мотор",
    topic: "Цифровизация и клиентские ожидания поколения Z",
    bio: "Эксперт в области машинного обучения и клиентского опыта. Автор методологии «Цифровой дилер» для CIS-рынка.",
    initials: "МИ",
    color: "#FF00FF",
  },
  {
    name: "Дмитрий Соколов",
    role: "Вице-президент по инновациям",
    company: "HAVAL",
    topic: "Чат-боты, которые действительно продают: кейс роста конверсии на 34%",
    bio: "Запустил более 20 ИИ-проектов в автоотрасли. Специализируется на разговорных интерфейсах и автоматизации воронок продаж.",
    initials: "ДС",
    color: "#7B2FBE",
  },
  {
    name: "Елена Волкова",
    role: "Руководитель цифровизации",
    company: "Hyundai Motor CIS",
    topic: "Генеративный ИИ для персонализированных предложений",
    bio: "Возглавляет программу цифровой трансформации для дилерской сети в СНГ. Спикер международных конференций по automotive tech.",
    initials: "ЕВ",
    color: "#9D4EDD",
  },
  {
    name: "Алексей Кузнецов",
    role: "Директор сервисного департамента",
    company: "Приглашённый эксперт",
    topic: "Почему сервис важнее продаж: новая экономика дилера",
    bio: "20 лет в автосервисном бизнесе. Разработал систему предиктивной диагностики для дилерских центров.",
    initials: "АК",
    color: "#FF00FF",
  },
  {
    name: "Кира Волкова",
    role: "Маркетолог-стратег",
    company: "Эксперт по цифровым коммуникациям",
    topic: "Маркетинг 6.0: от массовых рассылок к иммерсивному опыту",
    bio: "Консультант топ-10 автомобильных брендов. Автор курса «ИИ в автомаркетинге» с аудиторией 5000+ слушателей.",
    initials: "КВ",
    color: "#7B2FBE",
  },
  {
    name: "Эксперт-практик",
    role: "Руководитель дилерского холдинга",
    company: "Уточняется",
    topic: "Внедрение ИИ: с чего начать — живой кейс",
    bio: "Практик с реальным опытом внедрения ИИ-инструментов в операционную деятельность дилерского центра.",
    initials: "ЭП",
    color: "#9D4EDD",
  },
  {
    name: "Эксперт-практик",
    role: "HR-директор",
    company: "Уточняется",
    topic: "ИИ-ассистенты для onboarding и обучения сотрудников",
    bio: "Специалист по обучению персонала в условиях цифровой трансформации. Разработал методику внедрения ИИ в HR-процессы.",
    initials: "ЭП",
    color: "#FF00FF",
  },
];

const PROGRAM = [
  { time: "09:30 – 10:00", type: "break", title: "Регистрация, приветственный кофе", track: null },
  { time: "10:00 – 12:30", type: "session", title: "СЕССИЯ 1: ИИ НА ФРОНТЕ: КЛИЕНТСКИЙ ОПЫТ И ПРОДАЖИ", track: "sales" },
  { time: "10:00 – 10:30", type: "talk", title: "Основные системные ошибки и смена парадигмы", speaker: "Александр Петров", company: "CTO, Чанган Моторс Россия", track: "sales" },
  { time: "10:30 – 11:00", type: "talk", title: "Цифровизация и клиентские ожидания поколения Z", speaker: "Мария Иванова", company: "Директор по ИИ, Джили Мотор", track: "sales" },
  { time: "11:00 – 11:30", type: "talk", title: "Чат-боты, которые действительно продают: кейс роста конверсии на 34%", speaker: "Дмитрий Соколов", company: "Вице-президент по инновациям, HAVAL", track: "sales" },
  { time: "11:30 – 12:00", type: "talk", title: "Генеративный ИИ для персонализированных предложений", speaker: "Елена Волкова", company: "Руководитель цифровизации, Hyundai Motor CIS", track: "sales" },
  { time: "12:00 – 12:30", type: "panel", title: "Панельная дискуссия: Ошибки традиционных дилеров и действия лидеров рынка", track: "sales" },
  { time: "12:30 – 13:30", type: "break", title: "Обед и нетворкинг", track: null },
  { time: "13:30 – 15:30", type: "session", title: "СЕССИЯ 2: ИИ В СЕРВИСЕ: ЭФФЕКТИВНОСТЬ И ЛОЯЛЬНОСТЬ", track: "service" },
  { time: "13:30 – 14:00", type: "talk", title: "Почему сервис важнее продаж: новая экономика дилера", speaker: "Алексей Кузнецов", company: "Директор сервисного департамента", track: "service" },
  { time: "14:00 – 14:30", type: "talk", title: "Предиктивный сервис: как предсказать поломку до клиента", speaker: "Спикер уточняется", company: "", track: "service" },
  { time: "14:30 – 15:00", type: "talk", title: "ИИ для управления запасными частями: снижение остатков и простоев", speaker: "Спикер уточняется", company: "", track: "service" },
  { time: "15:00 – 15:30", type: "talk", title: "Апсейл как ключевой инструмент: как ИИ подсказывает доппродажи", speaker: "Спикер уточняется", company: "", track: "service" },
  { time: "15:30 – 17:00", type: "session", title: "СЕССИЯ 3: ВНУТРЕННЯЯ КУХНЯ: HR, МАРКЕТИНГ, БЕЗОПАСНОСТЬ", track: "marketing" },
  { time: "15:30 – 16:00", type: "talk", title: "Маркетинг 6.0: от массовых рассылок к иммерсивному опыту", speaker: "Кира Волкова", company: "Маркетолог-стратег", track: "marketing" },
  { time: "16:00 – 16:30", type: "talk", title: "ИИ-ассистенты для onboarding и обучения сотрудников", speaker: "Спикер уточняется", company: "", track: "it" },
  { time: "16:30 – 17:00", type: "talk", title: "Анализ тональности обращений в КСО: как сохранить репутацию", speaker: "Спикер уточняется", company: "", track: "it" },
  { time: "17:00 – 17:45", type: "session", title: "СЕССИЯ 4: ВНЕДРЕНИЕ ИИ: С ЧЕГО НАЧАТЬ?", track: "it" },
  { time: "17:00 – 17:45", type: "workshop", title: "Формат «Делай как я» — готовые фреймворки, шаблоны промптов, дорожные карты", speaker: "Эксперты-практики (2-3 человека)", company: "", track: "it" },
  { time: "17:45 – 18:00", type: "panel", title: "Заключительное слово и розыгрыш", track: null },
  { time: "18:00 – 20:00", type: "break", title: "Фуршет, неформальное общение, нетворкинг", track: null },
];

const TICKETS = [
  {
    id: "abc",
    title: "Для клиентов АВС",
    price: "Бесплатно",
    badge: null,
    features: [
      "Участие во всех сессиях",
      "Обед и кофе-брейки",
      "Доступ к записям после конференции",
      "Презентации спикеров",
    ],
    btnLabel: "Получить билет",
    btnStyle: "outline",
    note: "Проверка контракта АВС",
  },
  {
    id: "webinar",
    title: "Для участников вебинара",
    price: "4 000 ₽",
    badge: "Спеццена",
    features: [
      "Участие во всех сессиях",
      "Обед и кофе-брейки",
      "Доступ к записям",
      "Презентации спикеров",
      "Закрытый Telegram-чат участников",
    ],
    btnLabel: "Купить по промокоду ВЕБИНАР",
    btnStyle: "violet",
    note: null,
  },
  {
    id: "early",
    title: "Early Bird",
    price: "10 000 ₽",
    badge: "До 1 марта 2026",
    features: [
      "Участие во всех сессиях",
      "Обед и кофе-брейки",
      "Доступ к записям",
      "Презентации спикеров",
      "Закрытый Telegram-чат",
      "Приоритетная рассадка",
    ],
    btnLabel: "Забронировать",
    btnStyle: "neon",
    note: null,
    highlight: true,
  },
  {
    id: "standard",
    title: "Стандарт",
    price: "15 000 ₽",
    badge: "После 1 марта 2026",
    features: [
      "Участие во всех сессиях",
      "Обед и кофе-брейки",
      "Доступ к записям",
      "Презентации спикеров",
      "Закрытый Telegram-чат",
    ],
    btnLabel: "Купить билет",
    btnStyle: "violet",
    note: null,
  },
];

const PARTNER_PACKAGES = [
  {
    title: "Генеральный партнёр",
    price: "от 500 000 ₽",
    color: "#FF00FF",
    perks: [
      "Логотип на всех носителях",
      "Стенд 6x3 м в главной зоне",
      "10 билетов для сотрудников",
      "Выступление спикера (30 мин)",
      "Интеграция в онлайн-трансляцию",
      "Именной welcome-пакет участников",
    ],
  },
  {
    title: "Стратегический партнёр",
    price: "от 250 000 ₽",
    color: "#9D4EDD",
    perks: [
      "Логотип на ключевых носителях",
      "Стенд 4x2 м",
      "6 билетов для сотрудников",
      "Размещение материалов",
      "Упоминание в анонсах",
    ],
  },
  {
    title: "Официальный партнёр",
    price: "от 100 000 ₽",
    color: "#7B2FBE",
    perks: [
      "Логотип на сайте и программе",
      "Стол 2x1 м",
      "3 билета для сотрудников",
      "Раздаточные материалы",
    ],
  },
  {
    title: "Информационный партнёр",
    price: "Медиа / бартер",
    color: "#5A1F8E",
    perks: [
      "Логотип на сайте",
      "2 билета",
      "Взаимный пиар",
    ],
  },
];

const TRACKS = [
  { id: "all", label: "Все" },
  { id: "sales", label: "Продажи" },
  { id: "service", label: "Сервис" },
  { id: "marketing", label: "Маркетинг" },
  { id: "it", label: "ИТ / HR" },
];

// ── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = Math.ceil(target / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── PARTICLE BACKGROUND ───────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 4,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.id % 3 === 0 ? "#FF00FF" : p.id % 2 === 0 ? "#9D4EDD" : "#ffffff",
            opacity: p.opacity,
            animationName: "particle-float",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
        />
      ))}
      {/* Neon grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#9D4EDD" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// ── SCROLL REVEAL WRAPPER ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState("all");
  const [activeSpeaker, setActiveSpeaker] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [speakerFormData, setSpeakerFormData] = useState({ name: "", company: "", role: "", topic: "", description: "", link: "", email: "" });
  const [partnerFormData, setPartnerFormData] = useState({ company: "", name: "", role: "", package: "", email: "", phone: "" });
  const [speakerSent, setSpeakerSent] = useState(false);
  const [partnerSent, setPartnerSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredProgram = PROGRAM.filter(
    (item) => activeTrack === "all" || item.track === activeTrack || item.type === "break"
  );

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) { el.scrollIntoView({ behavior: "smooth" }); }
    setMobileMenuOpen(false);
  };

  const trackColor = (track: string | null) => {
    const map: Record<string, string> = {
      sales: "#9D4EDD",
      service: "#FF00FF",
      marketing: "#7B2FBE",
      it: "#5A1F8E",
    };
    return track ? map[track] || "#9D4EDD" : "transparent";
  };

  return (
    <div className="font-golos bg-[#0D0015] text-white min-h-screen">

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(13,0,21,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(157,78,221,0.2)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollTo("#hero")}
            className="font-oswald text-lg font-bold tracking-widest text-white"
            style={{ textShadow: "0 0 20px rgba(255,0,255,0.5)" }}
          >
            ИИ В АВТО <span style={{ color: "#FF00FF" }}>2.0</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-white/70 hover:text-white transition-colors hover:text-[#FF00FF]"
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("#tickets")}
            className="hidden lg:block px-5 py-2 text-sm font-oswald font-semibold tracking-wider rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #9D4EDD, #FF00FF)",
              boxShadow: "0 0 20px rgba(255,0,255,0.3)",
            }}
          >
            КУПИТЬ БИЛЕТ
          </button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D0015]/98 border-t border-[#9D4EDD]/20 px-6 py-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left text-white/80 hover:text-[#FF00FF] py-2 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#tickets")}
              className="w-full py-3 font-oswald font-semibold rounded-full text-white"
              style={{ background: "linear-gradient(135deg, #9D4EDD, #FF00FF)" }}
            >
              КУПИТЬ БИЛЕТ
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D0015 0%, #2D004B 50%, #0D0015 100%)" }}
      >
        <Particles />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(157,78,221,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,0,255,0.1) 0%, transparent 70%)", filter: "blur(30px)" }} />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24 pb-16">
          <div
            className="inline-block mb-6 px-5 py-2 text-sm font-golos tracking-widest rounded-full border"
            style={{
              borderColor: "rgba(255,0,255,0.4)",
              background: "rgba(255,0,255,0.05)",
              color: "#FF00FF",
              animation: "fade-in 0.6s ease-out forwards",
            }}
          >
            2 АПРЕЛЯ 2026 • МОСКВА
          </div>

          <h1
            className="font-oswald text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight mb-6"
            style={{
              animation: "fade-in 0.6s ease-out 0.2s both",
              textShadow: "0 0 60px rgba(157,78,221,0.3)",
            }}
          >
            ИИ В АВТОБИЗНЕСЕ{" "}
            <span style={{ color: "#FF00FF", textShadow: "0 0 40px rgba(255,0,255,0.6)" }}>2026</span>
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-wide">
              ОТ РУТИН К СТРАТЕГИЯМ
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed"
            style={{ animation: "fade-in 0.6s ease-out 0.4s both" }}
          >
            Вы теряете <span className="text-[#FF00FF] font-semibold">30% лидов</span> и{" "}
            <span className="text-[#FF00FF] font-semibold">20% сервисной выручки</span> из-за ручных процессов.
            <br />Приходите за готовыми алгоритмами внедрения.
          </p>

          {/* Counter */}
          <div
            className="inline-flex items-center gap-3 mb-10 px-6 py-3 rounded-full"
            style={{
              background: "rgba(157,78,221,0.1)",
              border: "1px solid rgba(157,78,221,0.3)",
              animation: "fade-in 0.6s ease-out 0.5s both",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-[#FF00FF] animate-pulse" />
            <span className="text-white/70">Уже с нами:</span>
            <span className="font-oswald text-2xl font-bold text-[#FF00FF]">
              <AnimatedCounter target={187} />
            </span>
            <span className="text-white/70">топ-менеджеров</span>
          </div>

          {/* Logos carousel placeholder */}
          <div
            className="flex flex-wrap items-center justify-center gap-6 mb-10 opacity-50"
            style={{ animation: "fade-in 0.6s ease-out 0.6s both" }}
          >
            {["HAVAL", "GEELY", "CHANGAN", "HYUNDAI", "LADA", "EXEED"].map((brand) => (
              <span key={brand} className="font-oswald text-sm tracking-widest text-white/50 border border-white/10 px-4 py-2 rounded">
                {brand}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "fade-in 0.6s ease-out 0.7s both" }}
          >
            <button
              onClick={() => scrollTo("#tickets")}
              className="px-10 py-4 font-oswald text-lg font-semibold tracking-wider rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #9D4EDD, #FF00FF)",
                boxShadow: "0 0 40px rgba(255,0,255,0.35)",
              }}
            >
              КУПИТЬ БИЛЕТ
            </button>
            <button
              onClick={() => scrollTo("#for-partners")}
              className="px-10 py-4 font-oswald text-lg font-semibold tracking-wider rounded-full border-2 transition-all duration-300 hover:scale-105 hover:bg-[#9D4EDD]/10"
              style={{ borderColor: "#9D4EDD", color: "#9D4EDD" }}
            >
              СТАТЬ ПАРТНЁРОМ
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <Icon name="ChevronDown" size={24} color="white" />
        </div>
      </section>

      {/* ── BLOCK 1: ABOUT ── */}
      <section id="about" className="py-24 bg-[#0D0015]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[#FF00FF] font-oswald tracking-widest text-sm uppercase">О конференции</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 mb-6 uppercase">
                Первая в России конференция<br />
                <span style={{ color: "#9D4EDD" }}>по ИИ для автобизнеса</span>
              </h2>
              <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
                Однодневное событие для топ- и мидл-менеджмента автомобильных импортёров и дилеров.
                Очный формат с онлайн-трансляцией. 8 часов практики, кейсов и нетворкинга.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "Users", value: "500+", label: "Участников" },
              { icon: "Mic", value: "12+", label: "Спикеров" },
              { icon: "BookOpen", value: "4", label: "Трека" },
              { icon: "Clock", value: "8 ч", label: "Программы" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div
                  className="text-center p-6 rounded-2xl border transition-all duration-300 hover:scale-105"
                  style={{ background: "rgba(157,78,221,0.05)", borderColor: "rgba(157,78,221,0.2)" }}
                >
                  <Icon name={stat.icon} size={32} className="mx-auto mb-3 text-[#9D4EDD]" />
                  <div className="font-oswald text-3xl font-bold text-[#FF00FF] mb-1">{stat.value}</div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCK 2: FOR WHOM ── */}
      <section id="for-whom" className="py-24" style={{ background: "#16213E" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[#FF00FF] font-oswald tracking-widest text-sm uppercase">Аудитория</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 uppercase">
                Кому это <span style={{ color: "#9D4EDD" }}>точно нужно</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ROLES.map((role, i) => (
              <Reveal key={role.title} delay={i * 0.1}>
                <div
                  className="group p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "rgba(45,0,75,0.4)",
                    borderColor: "rgba(157,78,221,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,0,255,0.5)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(255,0,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(157,78,221,0.2)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(157,78,221,0.15)", border: "1px solid rgba(157,78,221,0.3)" }}
                    >
                      <Icon name={role.icon} size={22} style={{ color: "#9D4EDD" }} />
                    </div>
                    <div>
                      <h3 className="font-oswald text-xl font-semibold mb-3 group-hover:text-[#FF00FF] transition-colors">
                        {role.title}
                      </h3>
                      <ul className="space-y-2">
                        {role.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2 text-white/60">
                            <span style={{ color: "#FF00FF", marginTop: "4px" }}>→</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCK 3: PROGRAM ── */}
      <section id="program" className="py-24 bg-[#0D0015]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-[#FF00FF] font-oswald tracking-widest text-sm uppercase">2 апреля 2026</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 mb-8 uppercase">
                Программа <span style={{ color: "#9D4EDD" }}>конференции</span>
              </h2>
              {/* Track filters */}
              <div className="flex flex-wrap justify-center gap-3">
                {TRACKS.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => setActiveTrack(track.id)}
                    className="px-5 py-2 rounded-full text-sm font-golos font-medium transition-all duration-200"
                    style={{
                      background: activeTrack === track.id ? "linear-gradient(135deg, #9D4EDD, #FF00FF)" : "rgba(157,78,221,0.1)",
                      color: activeTrack === track.id ? "white" : "rgba(255,255,255,0.6)",
                      border: activeTrack === track.id ? "none" : "1px solid rgba(157,78,221,0.25)",
                    }}
                  >
                    {track.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-2">
            {filteredProgram.map((item, i) => (
              <Reveal key={i} delay={Math.min(i * 0.03, 0.4)}>
                {item.type === "session" ? (
                  <div
                    className="px-6 py-4 rounded-xl mt-6"
                    style={{ background: "rgba(157,78,221,0.1)", borderLeft: `3px solid ${trackColor(item.track)}` }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-oswald text-sm tracking-wider text-white/40 min-w-[110px]">{item.time}</span>
                      <span className="font-oswald text-sm font-semibold tracking-wider" style={{ color: trackColor(item.track) }}>
                        {item.title}
                      </span>
                    </div>
                  </div>
                ) : item.type === "break" ? (
                  <div className="px-6 py-3 flex items-center gap-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <span className="font-oswald text-sm tracking-wider text-white/30 min-w-[110px]">{item.time}</span>
                    <span className="text-white/30 text-sm italic">{item.title}</span>
                  </div>
                ) : (
                  <div
                    className="px-6 py-4 rounded-xl border transition-all duration-200 hover:border-[#9D4EDD]/40 cursor-pointer group"
                    style={{ background: "rgba(45,0,75,0.2)", borderColor: "rgba(157,78,221,0.1)" }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                      <span className="font-oswald text-sm tracking-wider text-white/40 min-w-[110px]">{item.time}</span>
                      <div className="flex-1">
                        <p className="text-white/90 group-hover:text-white transition-colors">{item.title}</p>
                        {item.speaker && (
                          <p className="text-sm mt-1" style={{ color: "#9D4EDD" }}>
                            {item.speaker}{item.company ? ` — ${item.company}` : ""}
                          </p>
                        )}
                      </div>
                      {item.track && (
                        <span
                          className="text-xs px-3 py-1 rounded-full w-fit"
                          style={{ background: `${trackColor(item.track)}20`, color: trackColor(item.track), border: `1px solid ${trackColor(item.track)}40` }}
                        >
                          {TRACKS.find(t => t.id === item.track)?.label}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCK 4: SPEAKERS ── */}
      <section id="speakers" className="py-24" style={{ background: "#16213E" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[#FF00FF] font-oswald tracking-widest text-sm uppercase">Эксперты</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 uppercase">
                Спикеры <span style={{ color: "#9D4EDD" }}>конференции</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SPEAKERS.map((sp, i) => (
              <Reveal key={sp.name + i} delay={i * 0.06}>
                <div
                  className="relative group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(45,0,75,0.4)",
                    borderColor: activeSpeaker === i ? sp.color : "rgba(157,78,221,0.2)",
                    boxShadow: activeSpeaker === i ? `0 0 30px ${sp.color}40` : "none",
                  }}
                  onClick={() => setActiveSpeaker(activeSpeaker === i ? null : i)}
                >
                  {/* Photo placeholder with initials */}
                  <div
                    className="w-full aspect-square flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${sp.color}30, rgba(13,0,21,0.8))` }}
                  >
                    <span className="font-oswald text-4xl font-bold text-white/30">{sp.initials}</span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4"
                      style={{ background: `${sp.color}cc` }}
                    >
                      <div className="text-center">
                        <p className="text-white text-xs leading-relaxed">{sp.bio}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-oswald text-base font-semibold leading-tight mb-1">{sp.name}</h3>
                    <p className="text-xs mb-1" style={{ color: sp.color }}>{sp.role}</p>
                    <p className="text-xs text-white/40">{sp.company}</p>
                  </div>

                  {/* Expanded bio */}
                  {activeSpeaker === i && (
                    <div
                      className="px-4 pb-4 text-xs text-white/70 border-t"
                      style={{ borderColor: `${sp.color}30` }}
                    >
                      <p className="mt-3 mb-2 font-semibold text-white/90">Тема:</p>
                      <p style={{ color: sp.color }}>{sp.topic}</p>
                      <p className="mt-2">{sp.bio}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCK 5: TICKETS ── */}
      <section id="tickets" className="py-24 bg-[#0D0015]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[#FF00FF] font-oswald tracking-widest text-sm uppercase">Регистрация</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 uppercase">
                Выберите <span style={{ color: "#9D4EDD" }}>ваш билет</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {TICKETS.map((ticket, i) => (
              <Reveal key={ticket.id} delay={i * 0.1}>
                <div
                  className="relative rounded-2xl border p-6 flex flex-col h-full transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    background: ticket.highlight
                      ? "linear-gradient(135deg, rgba(157,78,221,0.2), rgba(255,0,255,0.1))"
                      : "rgba(45,0,75,0.3)",
                    borderColor: ticket.highlight ? "#FF00FF" : "rgba(157,78,221,0.2)",
                    boxShadow: ticket.highlight ? "0 0 40px rgba(255,0,255,0.15)" : "none",
                  }}
                >
                  {ticket.badge && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-oswald font-semibold whitespace-nowrap"
                      style={{
                        background: ticket.highlight ? "linear-gradient(135deg, #9D4EDD, #FF00FF)" : "rgba(157,78,221,0.3)",
                        border: ticket.highlight ? "none" : "1px solid rgba(157,78,221,0.4)",
                      }}
                    >
                      {ticket.badge}
                    </div>
                  )}

                  <h3 className="font-oswald text-lg font-semibold mt-2 mb-3">{ticket.title}</h3>
                  <div className="font-oswald text-3xl font-bold mb-5" style={{ color: ticket.highlight ? "#FF00FF" : "#9D4EDD" }}>
                    {ticket.price}
                  </div>

                  <ul className="space-y-2 flex-1 mb-6">
                    {ticket.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                        <Icon name="Check" size={14} style={{ color: "#9D4EDD", marginTop: "3px", flexShrink: 0 }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {ticket.note && (
                    <p className="text-xs text-white/30 mb-3 italic">{ticket.note}</p>
                  )}

                  <button
                    className="w-full py-3 font-oswald text-sm font-semibold tracking-wider rounded-full transition-all duration-200 hover:scale-105"
                    style={{
                      background: ticket.btnStyle === "neon"
                        ? "linear-gradient(135deg, #9D4EDD, #FF00FF)"
                        : ticket.btnStyle === "violet"
                          ? "rgba(157,78,221,0.2)"
                          : "transparent",
                      border: ticket.btnStyle !== "neon" ? "1px solid rgba(157,78,221,0.4)" : "none",
                      boxShadow: ticket.btnStyle === "neon" ? "0 0 20px rgba(255,0,255,0.3)" : "none",
                    }}
                  >
                    {ticket.btnLabel}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Extra options */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl border flex items-center gap-4" style={{ background: "rgba(45,0,75,0.2)", borderColor: "rgba(157,78,221,0.2)" }}>
                <Icon name="Monitor" size={28} style={{ color: "#9D4EDD", flexShrink: 0 }} />
                <div>
                  <p className="font-oswald font-semibold">Онлайн-участие (трансляция)</p>
                  <p className="text-[#FF00FF] font-oswald text-xl font-bold">5 000 ₽</p>
                  <p className="text-white/40 text-xs mt-1">Доступ ко всем сессиям онлайн</p>
                </div>
                <button
                  className="ml-auto px-5 py-2 rounded-full text-sm font-oswald font-semibold border border-[#9D4EDD]/40 hover:bg-[#9D4EDD]/10 transition-colors whitespace-nowrap"
                >
                  Купить
                </button>
              </div>
              <div className="p-6 rounded-2xl border flex items-center gap-4" style={{ background: "rgba(45,0,75,0.2)", borderColor: "rgba(157,78,221,0.2)" }}>
                <Icon name="Building2" size={28} style={{ color: "#9D4EDD", flexShrink: 0 }} />
                <div>
                  <p className="font-oswald font-semibold">Корпоративная заявка</p>
                  <p className="text-[#FF00FF] font-oswald text-xl font-bold">от 5 человек</p>
                  <p className="text-white/40 text-xs mt-1">Специальные условия — напишите нам</p>
                </div>
                <button
                  onClick={() => scrollTo("#contacts")}
                  className="ml-auto px-5 py-2 rounded-full text-sm font-oswald font-semibold border border-[#9D4EDD]/40 hover:bg-[#9D4EDD]/10 transition-colors whitespace-nowrap"
                >
                  Связаться
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BLOCK 6: FOR SPEAKERS ── */}
      <section id="for-speakers" className="py-24" style={{ background: "#16213E" }}>
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-[#FF00FF] font-oswald tracking-widest text-sm uppercase">Спикеры</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 uppercase">
                Хотите <span style={{ color: "#9D4EDD" }}>выступить?</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto mt-4 leading-relaxed">
                Мы открыты к предложениям от экспертов-практиков с реальными кейсами внедрения ИИ в автобизнесе.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { icon: "Clock3", title: "Формат", text: "20–30 мин. выступление + 10 мин. вопросы" },
              { icon: "Target", title: "Тема", text: "Один из треков: продажи, сервис, маркетинг, ИТ/HR" },
              { icon: "BarChart", title: "Требования", text: "Измеримые результаты в кейсе обязательны" },
            ].map((item) => (
              <Reveal key={item.title}>
                <div className="p-5 rounded-xl border text-center" style={{ background: "rgba(45,0,75,0.3)", borderColor: "rgba(157,78,221,0.2)" }}>
                  <Icon name={item.icon} size={28} className="mx-auto mb-3" style={{ color: "#9D4EDD" }} />
                  <p className="font-oswald font-semibold mb-1">{item.title}</p>
                  <p className="text-white/50 text-sm">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div
              className="rounded-2xl border p-8"
              style={{ background: "rgba(45,0,75,0.3)", borderColor: "rgba(157,78,221,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Icon name="AlertCircle" size={16} style={{ color: "#FF00FF" }} />
                <span className="text-[#FF00FF] text-sm">Дедлайн подачи заявок: 1 февраля 2026</span>
              </div>

              {speakerSent ? (
                <div className="text-center py-8">
                  <Icon name="CheckCircle" size={48} className="mx-auto mb-4" style={{ color: "#9D4EDD" }} />
                  <h3 className="font-oswald text-2xl font-bold mb-2">Заявка отправлена!</h3>
                  <p className="text-white/60">Мы свяжемся с вами в ближайшее время.</p>
                </div>
              ) : (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); setSpeakerSent(true); }}>
                  {[
                    { key: "name", label: "Имя и фамилия", placeholder: "Иван Петров" },
                    { key: "company", label: "Компания", placeholder: "Название компании" },
                    { key: "role", label: "Должность", placeholder: "Директор по продажам" },
                    { key: "topic", label: "Тема выступления", placeholder: "Как мы внедрили ИИ в колл-центр" },
                    { key: "link", label: "LinkedIn / сайт", placeholder: "https://..." },
                    { key: "email", label: "Email для связи", placeholder: "ivan@company.ru" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm text-white/50 mb-2">{field.label}</label>
                      <input
                        type={field.key === "email" ? "email" : "text"}
                        placeholder={field.placeholder}
                        value={speakerFormData[field.key as keyof typeof speakerFormData]}
                        onChange={(e) => setSpeakerFormData({ ...speakerFormData, [field.key]: e.target.value })}
                        className="w-full bg-[#0D0015]/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#9D4EDD]"
                        style={{ borderColor: "rgba(157,78,221,0.2)" }}
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-white/50 mb-2">Краткое описание (3–5 предложений)</label>
                    <textarea
                      rows={3}
                      placeholder="Опишите суть вашего кейса и ключевые результаты..."
                      value={speakerFormData.description}
                      onChange={(e) => setSpeakerFormData({ ...speakerFormData, description: e.target.value })}
                      className="w-full bg-[#0D0015]/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#9D4EDD] resize-none"
                      style={{ borderColor: "rgba(157,78,221,0.2)" }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full py-4 font-oswald text-base font-semibold tracking-wider rounded-full transition-all duration-200 hover:scale-[1.02]"
                      style={{ background: "linear-gradient(135deg, #9D4EDD, #FF00FF)", boxShadow: "0 0 30px rgba(255,0,255,0.2)" }}
                    >
                      ОТПРАВИТЬ ЗАЯВКУ
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-6 pt-6 border-t border-[#9D4EDD]/10 flex flex-wrap gap-6 text-sm text-white/40">
                <span>Программный директор:</span>
                <span>[Имя], <a href="mailto:program@aiauto2026.ru" className="hover:text-[#FF00FF] transition-colors">program@aiauto2026.ru</a></span>
                <a href="https://t.me/+QgiLIa1gFRY4Y2Iy" target="_blank" rel="noreferrer" className="hover:text-[#FF00FF] transition-colors">Telegram</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BLOCK 7: FOR PARTNERS ── */}
      <section id="for-partners" className="py-24 bg-[#0D0015]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[#FF00FF] font-oswald tracking-widest text-sm uppercase">Партнёрство</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 uppercase">
                Станьте партнёром <span style={{ color: "#9D4EDD" }}>конференции</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto mt-4">
                500+ топ-менеджеров автомобильной отрасли — ваша аудитория на один день. Выберите пакет или обсудим индивидуальные условия.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {PARTNER_PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.title} delay={i * 0.1}>
                <div
                  className="rounded-2xl border p-6 h-full flex flex-col transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    background: "rgba(45,0,75,0.3)",
                    borderColor: `${pkg.color}40`,
                    boxShadow: i === 0 ? `0 0 30px ${pkg.color}20` : "none",
                  }}
                >
                  <div className="w-3 h-3 rounded-full mb-4" style={{ background: pkg.color }} />
                  <h3 className="font-oswald text-lg font-bold mb-1">{pkg.title}</h3>
                  <p className="font-oswald text-2xl font-bold mb-5" style={{ color: pkg.color }}>{pkg.price}</p>
                  <ul className="space-y-2 flex-1">
                    {pkg.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm text-white/60">
                        <Icon name="Check" size={13} style={{ color: pkg.color, marginTop: "3px", flexShrink: 0 }} />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollTo("#contacts")}
                    className="mt-6 w-full py-3 font-oswald text-sm font-semibold tracking-wider rounded-full border transition-all duration-200 hover:scale-105"
                    style={{ borderColor: `${pkg.color}60`, color: pkg.color }}
                  >
                    Обсудить
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Partner inquiry form */}
          <Reveal>
            <div className="rounded-2xl border p-8" style={{ background: "rgba(45,0,75,0.2)", borderColor: "rgba(157,78,221,0.2)" }}>
              <h3 className="font-oswald text-2xl font-bold mb-2">Заявка на партнёрство</h3>
              <p className="text-white/50 mb-6 text-sm">Оставьте контакты — пришлём полный медиакит с условиями</p>

              {partnerSent ? (
                <div className="text-center py-8">
                  <Icon name="CheckCircle" size={48} className="mx-auto mb-4" style={{ color: "#9D4EDD" }} />
                  <h3 className="font-oswald text-2xl font-bold mb-2">Заявка получена!</h3>
                  <p className="text-white/60">Вышлем медиакит в течение 24 часов.</p>
                </div>
              ) : (
                <form
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  onSubmit={(e) => { e.preventDefault(); setPartnerSent(true); }}
                >
                  {[
                    { key: "company", label: "Компания", placeholder: "Название компании" },
                    { key: "name", label: "Контактное лицо", placeholder: "Имя и фамилия" },
                    { key: "role", label: "Должность", placeholder: "Директор по маркетингу" },
                    { key: "email", label: "Email", placeholder: "marketing@company.ru" },
                    { key: "phone", label: "Телефон", placeholder: "+7 (xxx) xxx-xx-xx" },
                    { key: "package", label: "Интересующий пакет", placeholder: "Генеральный / Стратегический / ..." },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm text-white/50 mb-2">{field.label}</label>
                      <input
                        type={field.key === "email" ? "email" : "text"}
                        placeholder={field.placeholder}
                        value={partnerFormData[field.key as keyof typeof partnerFormData]}
                        onChange={(e) => setPartnerFormData({ ...partnerFormData, [field.key]: e.target.value })}
                        className="w-full bg-[#0D0015]/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#9D4EDD]"
                        style={{ borderColor: "rgba(157,78,221,0.2)" }}
                      />
                    </div>
                  ))}
                  <div className="md:col-span-3">
                    <button
                      type="submit"
                      className="px-10 py-4 font-oswald text-base font-semibold tracking-wider rounded-full transition-all duration-200 hover:scale-105"
                      style={{ background: "linear-gradient(135deg, #9D4EDD, #FF00FF)", boxShadow: "0 0 30px rgba(255,0,255,0.2)" }}
                    >
                      ПОЛУЧИТЬ МЕДИАКИТ
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PARTNERS LOGO SECTION ── */}
      <section id="partners" className="py-16" style={{ background: "#16213E" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-white/30 text-sm font-oswald tracking-widest uppercase mb-8">Партнёры конференции</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-30">
              {["ПАРТНЁР 1", "ПАРТНЁР 2", "ПАРТНЁР 3", "ПАРТНЁР 4", "ПАРТНЁР 5"].map((p) => (
                <div key={p} className="border border-white/20 rounded-lg px-8 py-4">
                  <span className="font-oswald text-sm tracking-widest text-white">{p}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24 bg-[#0D0015]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mb-4 uppercase">
              Контакты
            </h2>
            <p className="text-white/50 mb-12">Остались вопросы? Мы на связи.</p>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
              {[
                { icon: "Mail", label: "Email", value: "info@aiauto2026.ru", href: "mailto:info@aiauto2026.ru" },
                { icon: "Send", label: "Telegram", value: "@aiauto2026", href: "https://t.me/+QgiLIa1gFRY4Y2Iy" },
                { icon: "MapPin", label: "Место", value: "Москва, уточняется", href: "#" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105 hover:border-[#FF00FF]/50"
                  style={{ background: "rgba(45,0,75,0.3)", borderColor: "rgba(157,78,221,0.2)" }}
                >
                  <Icon name={c.icon} size={28} style={{ color: "#9D4EDD" }} />
                  <p className="text-white/40 text-xs">{c.label}</p>
                  <p className="font-oswald font-semibold text-sm">{c.value}</p>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div
              className="p-10 rounded-3xl text-center"
              style={{
                background: "linear-gradient(135deg, rgba(157,78,221,0.15), rgba(255,0,255,0.05))",
                border: "1px solid rgba(255,0,255,0.2)",
                boxShadow: "0 0 60px rgba(157,78,221,0.1)",
              }}
            >
              <h3 className="font-oswald text-3xl md:text-4xl font-bold mb-4 uppercase">
                Место за столом<br />
                <span style={{ color: "#FF00FF" }}>уже ждёт вас</span>
              </h3>
              <p className="text-white/50 mb-8">2 апреля 2026 • Москва • 10:00 – 20:00</p>
              <button
                onClick={() => scrollTo("#tickets")}
                className="px-12 py-4 font-oswald text-lg font-semibold tracking-wider rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #9D4EDD, #FF00FF)",
                  boxShadow: "0 0 40px rgba(255,0,255,0.35)",
                }}
              >
                ЗАРЕГИСТРИРОВАТЬСЯ
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t" style={{ borderColor: "rgba(157,78,221,0.15)", background: "#0D0015" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-oswald text-lg font-bold tracking-widest" style={{ textShadow: "0 0 20px rgba(255,0,255,0.3)" }}>
            ИИ В АВТО <span style={{ color: "#FF00FF" }}>2.0</span>
          </span>
          <p className="text-white/25 text-sm">© 2026 Конференция по ИИ в автобизнесе. Все права защищены.</p>
          <div className="flex gap-4">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}