import Icon from "@/components/ui/icon";
import { NAV_LINKS, PARTNER_PACKAGES } from "@/data/conferenceData";
import { Reveal } from "./SharedComponents";

interface FormsContactsFooterProps {
  speakerFormData: { name: string; company: string; role: string; topic: string; description: string; link: string; email: string };
  setSpeakerFormData: (data: { name: string; company: string; role: string; topic: string; description: string; link: string; email: string }) => void;
  partnerFormData: { company: string; name: string; role: string; package: string; email: string; phone: string };
  setPartnerFormData: (data: { company: string; name: string; role: string; package: string; email: string; phone: string }) => void;
  contactFormData: { name: string; email: string; subject: string; message: string };
  setContactFormData: (data: { name: string; email: string; subject: string; message: string }) => void;
  speakerSent: boolean;
  setSpeakerSent: (v: boolean) => void;
  partnerSent: boolean;
  setPartnerSent: (v: boolean) => void;
  contactSent: boolean;
  setContactSent: (v: boolean) => void;
  scrollTo: (href: string) => void;
}

export default function FormsContactsFooter({
  speakerFormData,
  setSpeakerFormData,
  partnerFormData,
  setPartnerFormData,
  contactFormData,
  setContactFormData,
  speakerSent,
  setSpeakerSent,
  partnerSent,
  setPartnerSent,
  contactSent,
  setContactSent,
  scrollTo,
}: FormsContactsFooterProps) {
  return (
    <>
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
                <span><a href="mailto:info@autobisconsult.ru" className="hover:text-[#FF00FF] transition-colors">info@autobisconsult.ru</a></span>
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
            <div className="text-center mb-6">
              <span className="text-[#FF00FF] font-oswald tracking-widest text-sm uppercase">Партнёрство</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 uppercase">
                Станьте партнёром <span style={{ color: "#9D4EDD" }}>конференции</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto mt-4 text-lg">
                Достигните топ-менеджмента крупнейших автомобильных компаний России.
                <br />Аудитория конференции — <span className="text-[#FF00FF] font-semibold">300+ лиц, принимающих решения</span>.
              </p>
            </div>
          </Reveal>

          {/* Sponsor packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 mt-12">
            {PARTNER_PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.title} delay={i * 0.1}>
                <div
                  className="relative rounded-2xl border p-8 h-full flex flex-col transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    background: pkg.glow
                      ? "linear-gradient(135deg, rgba(255,0,255,0.08), rgba(45,0,75,0.6))"
                      : "rgba(45,0,75,0.3)",
                    borderColor: `${pkg.color}50`,
                    boxShadow: pkg.glow ? `0 0 50px ${pkg.color}25` : "none",
                  }}
                >
                  {pkg.glow && (
                    <div
                      className="absolute -top-px left-0 right-0 h-0.5 rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, transparent, ${pkg.color}, transparent)` }}
                    />
                  )}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-oswald text-xl font-bold" style={{ color: pkg.color }}>{pkg.title}</h3>
                      <span className="text-white/40 text-xs">{pkg.slots}</span>
                    </div>
                    <span
                      className="px-4 py-1 rounded-full text-sm font-oswald font-semibold"
                      style={{ background: `${pkg.color}20`, color: pkg.color, border: `1px solid ${pkg.color}40` }}
                    >
                      {pkg.price}
                    </span>
                  </div>
                  <ul className="space-y-3 flex-1">
                    {pkg.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3 text-sm text-white/70">
                        <Icon name="Check" size={14} style={{ color: pkg.color, marginTop: "3px", flexShrink: 0 }} />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollTo("#contacts")}
                    className="mt-8 w-full py-3 font-oswald text-sm font-semibold tracking-wider rounded-full border transition-all duration-200 hover:scale-105"
                    style={{
                      borderColor: `${pkg.color}60`,
                      color: pkg.color,
                      background: pkg.glow ? `${pkg.color}10` : "transparent",
                    }}
                  >
                    Обсудить условия
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Download mediakit */}
          <Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <a
                href="#"
                className="inline-flex items-center gap-3 px-8 py-4 font-oswald text-base font-semibold tracking-wider rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #9D4EDD, #FF00FF)",
                  boxShadow: "0 0 30px rgba(255,0,255,0.25)",
                }}
              >
                <Icon name="Download" size={18} />
                СКАЧАТЬ МЕДИАКИТ (PDF)
              </a>
              <p className="text-white/40 text-sm">Подробные условия, аудитория, форматы размещения</p>
            </div>
          </Reveal>

          {/* Partner inquiry form */}
          <Reveal>
            <div className="rounded-2xl border p-8" style={{ background: "rgba(45,0,75,0.2)", borderColor: "rgba(157,78,221,0.2)" }}>
              <h3 className="font-oswald text-2xl font-bold mb-1">Заявка на партнёрство</h3>
              <p className="text-white/50 mb-6 text-sm">Оставьте контакты — ответим в течение 24 часов</p>
              <div className="flex items-center gap-4 mb-6 p-4 rounded-xl" style={{ background: "rgba(157,78,221,0.08)", border: "1px solid rgba(157,78,221,0.2)" }}>
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ border: "1px solid rgba(157,78,221,0.4)", boxShadow: "0 0 16px rgba(157,78,221,0.25)" }}>
                  <img src="https://cdn.poehali.dev/projects/d4af42ec-5015-483c-b71c-6bf32723c131/bucket/3c31a22f-e25a-4095-b52f-743990fba8f0.png" alt="Инна Петухова" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-oswald text-base font-bold">Инна Петухова</p>
                  <p className="text-white/40 text-xs mb-1">Генеральный директор ABC</p>
                  <div className="flex flex-wrap gap-3 text-xs text-white/50">
                    <a href="tel:+79852320005" className="text-[#9D4EDD] hover:text-[#FF00FF] transition-colors">+7 985 232-00-05</a>
                    <span>·</span>
                    <a href="mailto:info@autobisconsult.ru" className="text-[#9D4EDD] hover:text-[#FF00FF] transition-colors">info@autobisconsult.ru</a>
                  </div>
                </div>
              </div>

              {partnerSent ? (
                <div className="text-center py-10">
                  <Icon name="CheckCircle" size={52} className="mx-auto mb-4" style={{ color: "#9D4EDD" }} />
                  <h3 className="font-oswald text-2xl font-bold mb-2">Заявка получена!</h3>
                  <p className="text-white/60">Вышлем медиакит и позвоним в течение 24 часов.</p>
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
                    { key: "package", label: "Интересующий пакет", placeholder: "Генеральный / Информационный" },
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
                      ОТПРАВИТЬ ЗАЯВКУ
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BLOCK 8: CONTACTS & ORGANIZERS ── */}
      <section id="contacts" className="py-24" style={{ background: "#16213E" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[#FF00FF] font-oswald tracking-widest text-sm uppercase">Оргкомитет</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 uppercase">
                Организационный <span style={{ color: "#9D4EDD" }}>комитет</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact info */}
            <Reveal>
              <div className="space-y-6">
                <h3 className="font-oswald text-2xl font-semibold mb-6">Контакты</h3>

                {[
                  { icon: "Mail", label: "Электронная почта", value: "info@autobisconsult.ru", href: "mailto:info@autobisconsult.ru" },
                  { icon: "Globe", label: "Сайт", value: "a-b-c.su", href: "https://a-b-c.su/" },
                  { icon: "Send", label: "Telegram", value: "@abc_cons", href: "https://t.me/abc_cons" },
                  { icon: "Phone", label: "Телефон (10:00–19:00)", value: "+7 985 232-00-05", href: "tel:+79852320005" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:border-[#9D4EDD]/50 hover:scale-[1.02] group"
                    style={{ background: "rgba(45,0,75,0.3)", borderColor: "rgba(157,78,221,0.15)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(157,78,221,0.15)" }}
                    >
                      <Icon name={c.icon} size={18} style={{ color: "#9D4EDD" }} />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-0.5">{c.label}</p>
                      <p className="font-golos font-medium text-sm group-hover:text-[#FF00FF] transition-colors">{c.value}</p>
                    </div>
                  </a>
                ))}

                {/* Organizer block */}
                <div
                  className="mt-8 p-6 rounded-xl border"
                  style={{ background: "rgba(45,0,75,0.2)", borderColor: "rgba(157,78,221,0.15)" }}
                >
                  <p className="text-white/40 text-xs mb-4 uppercase tracking-widest">Организатор</p>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0" style={{ border: "1px solid rgba(157,78,221,0.4)", boxShadow: "0 0 20px rgba(157,78,221,0.2)" }}>
                      <img src="https://cdn.poehali.dev/projects/d4af42ec-5015-483c-b71c-6bf32723c131/bucket/89cbe04c-606a-4f61-b2b5-f181b33d8fa6.png" alt="Auto Business Consulting" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-oswald text-lg font-bold">Auto Business Consulting</p>
                      <a href="https://a-b-c.su/" target="_blank" rel="noreferrer" className="text-[#9D4EDD] text-sm hover:text-[#FF00FF] transition-colors">Перейти на сайт →</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "rgba(157,78,221,0.15)" }}>
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ border: "1px solid rgba(157,78,221,0.35)", boxShadow: "0 0 12px rgba(157,78,221,0.2)" }}>
                      <img src="https://cdn.poehali.dev/projects/d4af42ec-5015-483c-b71c-6bf32723c131/bucket/3c31a22f-e25a-4095-b52f-743990fba8f0.png" alt="Инна Петухова" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-oswald text-sm font-bold">Инна Петухова</p>
                      <p className="text-white/40 text-xs">Генеральный директор ABC</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Contact form */}
            <Reveal delay={0.15}>
              <div className="rounded-2xl border p-8" style={{ background: "rgba(45,0,75,0.3)", borderColor: "rgba(157,78,221,0.2)" }}>
                <h3 className="font-oswald text-2xl font-semibold mb-6">Форма обратной связи</h3>

                {contactSent ? (
                  <div className="text-center py-12">
                    <Icon name="CheckCircle" size={52} className="mx-auto mb-4" style={{ color: "#9D4EDD" }} />
                    <h3 className="font-oswald text-2xl font-bold mb-2">Сообщение отправлено!</h3>
                    <p className="text-white/60">Ответим в ближайшее время.</p>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setContactSent(true); }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/50 mb-2">Имя</label>
                        <input
                          type="text"
                          placeholder="Иван Петров"
                          value={contactFormData.name}
                          onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                          className="w-full bg-[#0D0015]/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#9D4EDD]"
                          style={{ borderColor: "rgba(157,78,221,0.2)" }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-white/50 mb-2">Email</label>
                        <input
                          type="email"
                          placeholder="ivan@company.ru"
                          value={contactFormData.email}
                          onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                          className="w-full bg-[#0D0015]/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#9D4EDD]"
                          style={{ borderColor: "rgba(157,78,221,0.2)" }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-white/50 mb-2">Тема</label>
                      <select
                        value={contactFormData.subject}
                        onChange={(e) => setContactFormData({ ...contactFormData, subject: e.target.value })}
                        className="w-full bg-[#0D0015] border rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#9D4EDD] appearance-none"
                        style={{ borderColor: "rgba(157,78,221,0.2)" }}
                      >
                        <option value="" style={{ background: "#0D0015" }}>Выберите тему</option>
                        <option value="tickets" style={{ background: "#0D0015" }}>Вопрос о билетах</option>
                        <option value="speaker" style={{ background: "#0D0015" }}>Предложение стать спикером</option>
                        <option value="partner" style={{ background: "#0D0015" }}>Предложение о партнёрстве</option>
                        <option value="other" style={{ background: "#0D0015" }}>Другое</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-white/50 mb-2">Сообщение</label>
                      <textarea
                        rows={4}
                        placeholder="Ваш вопрос или сообщение..."
                        value={contactFormData.message}
                        onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                        className="w-full bg-[#0D0015]/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#9D4EDD] resize-none"
                        style={{ borderColor: "rgba(157,78,221,0.2)" }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 font-oswald text-base font-semibold tracking-wider rounded-full transition-all duration-200 hover:scale-[1.02]"
                      style={{ background: "linear-gradient(135deg, #9D4EDD, #FF00FF)", boxShadow: "0 0 30px rgba(255,0,255,0.2)" }}
                    >
                      ОТПРАВИТЬ
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* CTA banner */}
          <Reveal>
            <div
              className="mt-16 p-10 rounded-3xl text-center"
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
      <footer className="py-12 border-t" style={{ borderColor: "rgba(157,78,221,0.15)", background: "#0D0015" }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div>
              <div className="font-oswald text-2xl font-bold tracking-widest mb-3" style={{ textShadow: "0 0 20px rgba(255,0,255,0.3)" }}>
                ИИ В АВТО <span style={{ color: "#FF00FF" }}>2.0</span>
              </div>
              <p className="text-white/30 text-sm max-w-xs leading-relaxed">
                Конференция по внедрению ИИ в бизнес-процессы автомобильных компаний. 2 апреля 2026, Москва.
              </p>
              {/* Organizer logo */}
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0"
                  style={{ border: "1px solid rgba(157,78,221,0.3)" }}
                >
                  <img
                    src="https://cdn.poehali.dev/projects/d4af42ec-5015-483c-b71c-6bf32723c131/bucket/89cbe04c-606a-4f61-b2b5-f181b33d8fa6.png"
                    alt="ABC"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white/30 text-xs">Auto Business Consulting</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <p className="font-oswald text-xs tracking-widest text-white/30 uppercase mb-4">Навигация</p>
                <ul className="space-y-2">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="text-xs text-white/40 hover:text-[#FF00FF] transition-colors"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-oswald text-xs tracking-widest text-white/30 uppercase mb-4">Контакты</p>
                <ul className="space-y-2 text-xs text-white/40">
                  <li><a href="mailto:Inna.Petuhova@autobisconsult.ru" className="hover:text-[#FF00FF] transition-colors">Inna.Petuhova@autobisconsult.ru</a></li>
                  <li><a href="https://t.me/abc_cons" target="_blank" rel="noreferrer" className="hover:text-[#FF00FF] transition-colors">Telegram</a></li>
                  <li><a href="https://a-b-c.su/" target="_blank" rel="noreferrer" className="hover:text-[#FF00FF] transition-colors">a-b-c.su</a></li>
                </ul>
              </div>

              <div>
                <p className="font-oswald text-xs tracking-widest text-white/30 uppercase mb-4">Документы</p>
                <ul className="space-y-2 text-xs text-white/40">
                  <li><a href="#" className="hover:text-[#FF00FF] transition-colors">Политика конфиденциальности</a></li>
                  <li><a href="#" className="hover:text-[#FF00FF] transition-colors">Медиакит для партнёров (PDF)</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div
            className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: "rgba(157,78,221,0.1)" }}
          >
            <p className="text-white/20 text-xs">© 2026 Конференция по ИИ в автобизнесе. Все права защищены.</p>
            <div className="flex items-center gap-4">
              <a
                href="https://t.me/abc_cons"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border flex items-center justify-center transition-all hover:border-[#FF00FF] hover:scale-110"
                style={{ borderColor: "rgba(157,78,221,0.3)" }}
              >
                <Icon name="Send" size={14} style={{ color: "#9D4EDD" }} />
              </a>
              <a
                href="https://a-b-c.su/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border flex items-center justify-center transition-all hover:border-[#FF00FF] hover:scale-110"
                style={{ borderColor: "rgba(157,78,221,0.3)" }}
              >
                <Icon name="Globe" size={14} style={{ color: "#9D4EDD" }} />
              </a>
              <button
                onClick={() => scrollTo("#tickets")}
                className="px-5 py-2 font-oswald text-xs font-semibold tracking-wider rounded-full transition-all duration-200 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #9D4EDD, #FF00FF)", boxShadow: "0 0 15px rgba(255,0,255,0.2)" }}
              >
                КУПИТЬ БИЛЕТ
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}