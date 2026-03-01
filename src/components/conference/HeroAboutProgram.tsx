import Icon from "@/components/ui/icon";
import { exportProgramDocx } from "@/utils/exportProgram";
import { NAV_LINKS, ROLES, PROGRAM, TRACKS, TRACK_COLOR_MAP } from "@/data/conferenceData";
import { AnimatedCounter, Particles, Reveal } from "./SharedComponents";

interface HeroAboutProgramProps {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  activeTrack: string;
  setActiveTrack: (v: string) => void;
  scrollTo: (href: string) => void;
}

const trackColor = (track: string | null) => {
  return track ? TRACK_COLOR_MAP[track] || "#9D4EDD" : "transparent";
};

export default function HeroAboutProgram({
  scrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  activeTrack,
  setActiveTrack,
  scrollTo,
}: HeroAboutProgramProps) {
  const filteredProgram = PROGRAM.filter(
    (item) => activeTrack === "all" || item.track === activeTrack || item.type === "break"
  );

  return (
    <>
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
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/d4af42ec-5015-483c-b71c-6bf32723c131/bucket/324a8a9f-e006-4d7a-b015-9f139c0a89e1.jpg"
              alt="AI Navigate"
              className="h-10 w-10 rounded-full object-cover"
              style={{ boxShadow: "0 0 16px rgba(255,0,255,0.4)" }}
            />
            <span
              className="font-oswald text-lg font-bold tracking-widest text-white"
              style={{ textShadow: "0 0 20px rgba(255,0,255,0.5)" }}
            >
              ИИ В АВТО <span style={{ color: "#FF00FF" }}>2.0</span>
            </span>
          </button>

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

          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

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

        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(157,78,221,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,0,255,0.1) 0%, transparent 70%)", filter: "blur(30px)" }} />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24 pb-16">
          <div className="flex justify-center mb-6" style={{ animation: "fade-in 0.6s ease-out forwards" }}>
            <img
              src="https://cdn.poehali.dev/projects/d4af42ec-5015-483c-b71c-6bf32723c131/bucket/324a8a9f-e006-4d7a-b015-9f139c0a89e1.jpg"
              alt="AI Navigate"
              className="h-28 w-28 md:h-36 md:w-36 rounded-full object-cover"
              style={{ boxShadow: "0 0 60px rgba(157,78,221,0.5), 0 0 120px rgba(255,0,255,0.2)" }}
            />
          </div>

          <div
            className="inline-block mb-6 px-5 py-2 text-sm font-golos tracking-widest rounded-full border"
            style={{
              borderColor: "rgba(255,0,255,0.4)",
              background: "rgba(255,0,255,0.05)",
              color: "#FF00FF",
              animation: "fade-in 0.6s ease-out 0.1s both",
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
              <button
                onClick={exportProgramDocx}
                className="inline-flex items-center gap-2 px-6 py-2.5 mb-8 rounded-full text-sm font-golos font-medium transition-all duration-200 hover:scale-105"
                style={{ background: "rgba(157,78,221,0.12)", border: "1px solid rgba(157,78,221,0.35)", color: "rgba(255,255,255,0.7)" }}
              >
                <Icon name="Download" size={15} />
                Скачать программу (.docx)
              </button>

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
    </>
  );
}
