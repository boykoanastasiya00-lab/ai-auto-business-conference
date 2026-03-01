import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { TicketType } from "@/data/conferenceData";

export function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
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

export function Particles() {
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

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

export function TicketModal({ ticket, onClose }: { ticket: TicketType; onClose: () => void }) {
  const [step, setStep] = useState<"form" | "promo" | "success">("form");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", contract: "", promo: "" });
  const isAbc = ticket.id === "abc";
  const isWebinar = ticket.id === "webinar";

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
      onClick={handleBackdrop}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border p-8 animate-scale-in overflow-y-auto max-h-[90vh]"
        style={{
          background: "linear-gradient(135deg, #1A0030, #0D0015)",
          borderColor: "rgba(157,78,221,0.4)",
          boxShadow: "0 0 80px rgba(157,78,221,0.2), 0 0 160px rgba(255,0,255,0.05)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
        >
          <Icon name="X" size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
        </button>

        {step === "success" ? (
          <div className="text-center py-8">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(157,78,221,0.15)", border: "2px solid #9D4EDD" }}
            >
              <Icon name="CheckCircle" size={40} style={{ color: "#9D4EDD" }} />
            </div>
            <h3 className="font-oswald text-3xl font-bold mb-3">Готово!</h3>
            <p className="text-white/60 mb-2">Заявка на <span className="text-[#FF00FF]">{ticket.title}</span> принята.</p>
            <p className="text-white/40 text-sm mb-8">Мы отправим подтверждение на <span className="text-white/60">{formData.email}</span></p>
            <button
              onClick={onClose}
              className="px-8 py-3 font-oswald font-semibold tracking-wider rounded-full"
              style={{ background: "linear-gradient(135deg, #9D4EDD, #FF00FF)" }}
            >
              ОТЛИЧНО!
            </button>
          </div>
        ) : (
          <>
            <div className="mb-7">
              <span className="text-[#FF00FF] text-xs font-oswald tracking-widest uppercase">Регистрация</span>
              <h3 className="font-oswald text-2xl font-bold mt-1 mb-1">{ticket.title}</h3>
              <div className="font-oswald text-3xl font-bold" style={{ color: "#FF00FF" }}>{ticket.price}</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: "name", label: "Имя и фамилия *", placeholder: "Иван Петров", required: true },
                { key: "email", label: "Email *", placeholder: "ivan@company.ru", required: true, type: "email" },
                { key: "phone", label: "Телефон *", placeholder: "+7 (900) 123-45-67", required: true },
                { key: "company", label: "Компания / должность", placeholder: "ООО Автоцентр, директор по продажам" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm text-white/50 mb-1.5">{f.label}</label>
                  <input
                    type={f.type || "text"}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={formData[f.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    className="w-full bg-[#0D0015]/70 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#9D4EDD]"
                    style={{ borderColor: "rgba(157,78,221,0.25)" }}
                  />
                </div>
              ))}

              {isAbc && (
                <div>
                  <label className="block text-sm text-white/50 mb-1.5">Номер контракта АВС *</label>
                  <input
                    type="text"
                    required
                    placeholder="Введите номер контракта"
                    value={formData.contract}
                    onChange={(e) => setFormData({ ...formData, contract: e.target.value })}
                    className="w-full bg-[#0D0015]/70 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#9D4EDD]"
                    style={{ borderColor: "rgba(157,78,221,0.25)" }}
                  />
                  <p className="text-white/30 text-xs mt-1.5">Участие бесплатно для действующих клиентов АВС</p>
                </div>
              )}

              {isWebinar && (
                <div>
                  <label className="block text-sm text-white/50 mb-1.5">Промокод *</label>
                  <input
                    type="text"
                    required
                    placeholder="ВЕБИНАР"
                    value={formData.promo}
                    onChange={(e) => setFormData({ ...formData, promo: e.target.value.toUpperCase() })}
                    className="w-full bg-[#0D0015]/70 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#9D4EDD] tracking-widest font-oswald"
                    style={{ borderColor: "rgba(157,78,221,0.25)" }}
                  />
                  <p className="text-white/30 text-xs mt-1.5">Промокод для участников вебинара: <span className="text-[#9D4EDD]">ВЕБИНАР</span></p>
                </div>
              )}

              {ticket.price !== "Бесплатно" && (
                <div
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ background: "rgba(157,78,221,0.08)", border: "1px solid rgba(157,78,221,0.2)" }}
                >
                  <span className="text-white/50 text-sm">К оплате:</span>
                  <span className="font-oswald text-xl font-bold text-[#FF00FF]">{ticket.price}</span>
                </div>
              )}

              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="oferta-agree"
                  required
                  className="mt-0.5 w-4 h-4 shrink-0 accent-[#9D4EDD] cursor-pointer"
                />
                <label htmlFor="oferta-agree" className="text-white/40 text-xs leading-relaxed cursor-pointer">
                  Я ознакомился и принимаю условия{" "}
                  <a href="#" className="text-white/60 hover:text-[#FF00FF] transition-colors underline">договора оферты</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 font-oswald text-base font-semibold tracking-wider rounded-full transition-all duration-200 hover:scale-[1.02] mt-2"
                style={{
                  background: "linear-gradient(135deg, #9D4EDD, #FF00FF)",
                  boxShadow: "0 0 30px rgba(255,0,255,0.25)",
                }}
              >
                {isAbc ? "ПОЛУЧИТЬ БЕСПЛАТНЫЙ БИЛЕТ" : "ПЕРЕЙТИ К ОПЛАТЕ"}
              </button>

              <p className="text-center text-white/25 text-xs">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="#" className="text-white/40 hover:text-[#FF00FF] transition-colors underline">политикой конфиденциальности</a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
