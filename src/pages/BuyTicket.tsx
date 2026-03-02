import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { TICKETS } from "@/data/conferenceData";

const STEPS = ["Билет", "Данные", "Подтверждение"];

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  contract: string;
  promo: string;
}

export default function BuyTicket() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get("ticket") || TICKETS[2].id;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedId, setSelectedId] = useState<string>(initialId);
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", company: "", contract: "", promo: "" });

  const ticket = TICKETS.find((t) => t.id === selectedId) ?? TICKETS[0];
  const isFree = ticket.price === "Бесплатно";
  const isAbc = ticket.id === "abc";
  const isWebinar = ticket.id === "webinar";

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="min-h-screen bg-[#0D0015] text-white font-golos">
      {/* Header */}
      <header className="border-b border-[#9D4EDD]/20 sticky top-0 z-50 backdrop-blur-md" style={{ background: "rgba(13,0,21,0.92)" }}>
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
            <Icon name="ArrowLeft" size={16} />
            На главную
          </button>
          <span className="font-oswald text-lg tracking-wider font-bold" style={{ color: "#FF00FF" }}>AI АВТО 2026</span>
          <span className="text-white/30 text-xs">Москва · 26 июня 2026</span>
        </div>
      </header>

      {/* Progress bar */}
      {step < 4 && (
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <div className="flex items-center gap-2 mb-10">
            {STEPS.map((label, i) => {
              const num = i + 1;
              const active = step === num;
              const done = step > num;
              return (
                <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
                  <div className="flex items-center gap-2.5 shrink-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-oswald font-bold transition-all duration-300"
                      style={{
                        background: done ? "#9D4EDD" : active ? "linear-gradient(135deg,#9D4EDD,#FF00FF)" : "rgba(157,78,221,0.12)",
                        border: done || active ? "none" : "1px solid rgba(157,78,221,0.3)",
                        boxShadow: active ? "0 0 16px rgba(255,0,255,0.4)" : "none",
                        color: done || active ? "#fff" : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {done ? <Icon name="Check" size={14} /> : num}
                    </div>
                    <span className={`text-sm font-oswald tracking-wide hidden sm:block ${active ? "text-white" : done ? "text-[#9D4EDD]" : "text-white/25"}`}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-px mx-2" style={{ background: done ? "rgba(157,78,221,0.6)" : "rgba(157,78,221,0.15)" }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 pb-24">

        {/* ── STEP 1: выбор билета ── */}
        {step === 1 && (
          <div>
            <h1 className="font-oswald text-3xl md:text-4xl font-bold mb-2 uppercase">Выберите <span style={{ color: "#FF00FF" }}>билет</span></h1>
            <p className="text-white/40 text-sm mb-8">Нажмите на карточку, чтобы выбрать тариф</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {TICKETS.map((t) => {
                const active = selectedId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedId(t.id)}
                    className="relative text-left rounded-2xl p-6 border transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: active
                        ? "linear-gradient(135deg, rgba(157,78,221,0.18), rgba(255,0,255,0.08))"
                        : "rgba(255,255,255,0.03)",
                      borderColor: active ? "#FF00FF" : "rgba(157,78,221,0.2)",
                      boxShadow: active ? "0 0 32px rgba(255,0,255,0.15)" : "none",
                    }}
                  >
                    {t.badge && (
                      <span
                        className="absolute top-4 right-4 text-xs font-oswald tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: t.id === "early" ? "linear-gradient(135deg,#9D4EDD,#FF00FF)" : "rgba(157,78,221,0.25)", color: "#fff" }}
                      >
                        {t.badge}
                      </span>
                    )}

                    {active && (
                      <div className="absolute top-4 left-4 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#FF00FF" }}>
                        <Icon name="Check" size={11} />
                      </div>
                    )}

                    <div className={`font-oswald text-base font-semibold mb-1 ${active ? "text-white" : "text-white/70"} ${active ? "pl-7" : ""}`}>
                      {t.title}
                    </div>
                    <div className="font-oswald text-2xl font-bold mb-4" style={{ color: active ? "#FF00FF" : "#9D4EDD" }}>
                      {t.price}
                    </div>

                    <ul className="space-y-2">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-white/55">
                          <Icon name="Check" size={13} className="mt-0.5 shrink-0" style={{ color: "#9D4EDD" }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {t.note && (
                      <p className="mt-4 text-xs text-white/30 italic">{t.note}</p>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-10 py-3.5 font-oswald text-base font-semibold tracking-wider rounded-full transition-all duration-200 hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg,#9D4EDD,#FF00FF)", boxShadow: "0 0 30px rgba(255,0,255,0.25)" }}
              >
                ДАЛЕЕ →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: данные ── */}
        {step === 2 && (
          <div>
            <h1 className="font-oswald text-3xl md:text-4xl font-bold mb-2 uppercase">Данные <span style={{ color: "#FF00FF" }}>участника</span></h1>
            <p className="text-white/40 text-sm mb-8">Билет: <span className="text-[#9D4EDD]">{ticket.title}</span> · {ticket.price}</p>

            <form
              className="space-y-5"
              onSubmit={(e) => { e.preventDefault(); setStep(3); }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {([
                  { key: "name", label: "Имя и фамилия *", placeholder: "Иван Петров", required: true },
                  { key: "email", label: "Email *", placeholder: "ivan@company.ru", required: true, type: "email" },
                  { key: "phone", label: "Телефон *", placeholder: "+7 (900) 123-45-67", required: true },
                  { key: "company", label: "Компания / должность", placeholder: "ООО Автоцентр, директор по продажам" },
                ] as { key: keyof FormData; label: string; placeholder: string; required?: boolean; type?: string }[]).map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs text-white/40 mb-1.5 font-oswald tracking-wide uppercase">{f.label}</label>
                    <input
                      type={f.type || "text"}
                      required={f.required}
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={set(f.key)}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none border transition-colors focus:border-[#9D4EDD]"
                      style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(157,78,221,0.2)" }}
                    />
                  </div>
                ))}
              </div>

              {isAbc && (
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-oswald tracking-wide uppercase">Номер контракта АВС *</label>
                  <input
                    type="text"
                    required
                    placeholder="Введите номер контракта"
                    value={form.contract}
                    onChange={set("contract")}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none border transition-colors focus:border-[#9D4EDD]"
                    style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(157,78,221,0.2)" }}
                  />
                  <p className="text-xs text-white/30 mt-1.5">Указан в вашем договоре с Автобизнес Консалтинг</p>
                </div>
              )}

              {isWebinar && (
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-oswald tracking-wide uppercase">Промокод *</label>
                  <input
                    type="text"
                    required
                    placeholder="ВЕБИНАР"
                    value={form.promo}
                    onChange={set("promo")}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none border transition-colors focus:border-[#FF00FF] uppercase"
                    style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(157,78,221,0.2)" }}
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
                >
                  <Icon name="ArrowLeft" size={14} />
                  Назад
                </button>
                <button
                  type="submit"
                  className="px-10 py-3.5 font-oswald text-base font-semibold tracking-wider rounded-full transition-all duration-200 hover:scale-[1.03]"
                  style={{ background: "linear-gradient(135deg,#9D4EDD,#FF00FF)", boxShadow: "0 0 30px rgba(255,0,255,0.25)" }}
                >
                  ДАЛЕЕ →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── STEP 3: подтверждение ── */}
        {step === 3 && (
          <div>
            <h1 className="font-oswald text-3xl md:text-4xl font-bold mb-2 uppercase">Подтверждение <span style={{ color: "#FF00FF" }}>заявки</span></h1>
            <p className="text-white/40 text-sm mb-8">Проверьте данные перед отправкой</p>

            {/* Итоговая карточка */}
            <div
              className="rounded-2xl border p-6 mb-8"
              style={{ background: "linear-gradient(135deg, rgba(157,78,221,0.10), rgba(255,0,255,0.05))", borderColor: "rgba(157,78,221,0.3)" }}
            >
              <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-[#9D4EDD]/15">
                <div>
                  <span className="text-[#FF00FF] text-xs font-oswald tracking-widest uppercase">Билет</span>
                  <div className="font-oswald text-xl font-bold mt-0.5">{ticket.title}</div>
                </div>
                <div className="font-oswald text-2xl font-bold shrink-0" style={{ color: "#FF00FF" }}>{ticket.price}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  { label: "Имя", value: form.name },
                  { label: "Email", value: form.email },
                  { label: "Телефон", value: form.phone },
                  { label: "Компания", value: form.company || "—" },
                  ...(isAbc ? [{ label: "Контракт АВС", value: form.contract }] : []),
                  ...(isWebinar ? [{ label: "Промокод", value: form.promo }] : []),
                ].map((row) => (
                  <div key={row.label}>
                    <span className="text-white/35 text-xs font-oswald tracking-wider uppercase">{row.label}</span>
                    <div className="text-white mt-0.5">{row.value}</div>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 pt-4 border-t border-[#9D4EDD]/15 flex items-center gap-2 text-xs text-white/30"
              >
                <Icon name="MapPin" size={12} style={{ color: "#9D4EDD" }} />
                Москва · 26 июня 2026 · 09:30
              </div>
            </div>

            {/* Включено */}
            <div className="rounded-2xl border p-5 mb-8" style={{ borderColor: "rgba(157,78,221,0.15)", background: "rgba(255,255,255,0.02)" }}>
              <div className="text-xs font-oswald tracking-widest text-white/35 uppercase mb-3">Что входит</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ticket.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                    <Icon name="Check" size={13} className="mt-0.5 shrink-0" style={{ color: "#9D4EDD" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
              >
                <Icon name="ArrowLeft" size={14} />
                Назад
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-10 py-3.5 font-oswald text-base font-semibold tracking-wider rounded-full transition-all duration-200 hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg,#9D4EDD,#FF00FF)", boxShadow: "0 0 30px rgba(255,0,255,0.3)" }}
              >
                {isFree ? "ПОДТВЕРДИТЬ" : "ОПЛАТИТЬ"} {!isFree && ticket.price}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: успех ── */}
        {step === 4 && (
          <div className="flex flex-col items-center text-center py-16">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
              style={{ background: "rgba(157,78,221,0.12)", border: "2px solid #9D4EDD", boxShadow: "0 0 60px rgba(157,78,221,0.25)" }}
            >
              <Icon name="CheckCircle" size={52} style={{ color: "#FF00FF" }} />
            </div>

            <h2 className="font-oswald text-4xl font-bold mb-3 uppercase">Готово!</h2>
            <p className="text-white/60 mb-2 text-lg">
              Ваша заявка на <span className="text-[#FF00FF]">{ticket.title}</span> принята
            </p>
            <p className="text-white/35 text-sm mb-10">
              Подтверждение придёт на <span className="text-white/55">{form.email}</span> в течение нескольких минут
            </p>

            <div
              className="rounded-2xl border p-6 w-full max-w-sm mb-10 text-left"
              style={{ borderColor: "rgba(157,78,221,0.2)", background: "rgba(157,78,221,0.06)" }}
            >
              <div className="text-xs font-oswald tracking-widest text-white/30 uppercase mb-4">Что дальше</div>
              {[
                { icon: "Mail", text: "Письмо с билетом на email" },
                { icon: "Users", text: "Приглашение в закрытый Telegram-чат участников" },
                { icon: "MapPin", text: "Адрес площадки и схема проезда — за 3 дня до события" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 mb-3 last:mb-0">
                  <Icon name={item.icon as "Mail"} size={16} className="mt-0.5 shrink-0" style={{ color: "#9D4EDD" }} />
                  <span className="text-sm text-white/60">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/")}
                className="px-8 py-3 font-oswald font-semibold tracking-wider rounded-full border transition-all hover:bg-white/5"
                style={{ borderColor: "rgba(157,78,221,0.4)", color: "rgba(255,255,255,0.7)" }}
              >
                НА ГЛАВНУЮ
              </button>
              <a
                href="https://t.me/+QgiLIa1gFRY4Y2Iy"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3 font-oswald font-semibold tracking-wider rounded-full transition-all hover:scale-[1.03] flex items-center gap-2"
                style={{ background: "linear-gradient(135deg,#9D4EDD,#FF00FF)", boxShadow: "0 0 24px rgba(255,0,255,0.25)" }}
              >
                <Icon name="Send" size={16} />
                НАШЕ СООБЩЕСТВО
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
