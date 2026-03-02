import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { SPEAKERS, TICKETS, TicketType } from "@/data/conferenceData";
import { Reveal } from "./SharedComponents";

interface SpeakersTeamTicketsProps {
  setActiveTicket: (ticket: TicketType | null) => void;
  scrollTo: (href: string) => void;
}

export default function SpeakersTeamTickets({ setActiveTicket, scrollTo }: SpeakersTeamTicketsProps) {
  const navigate = useNavigate();
  return (
    <>
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

          <Reveal>
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(157,78,221,0.25)" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "rgba(157,78,221,0.15)" }}>
                    <th className="text-left px-6 py-4 font-oswald text-sm tracking-widest uppercase text-white/50">Спикер</th>
                    <th className="text-left px-6 py-4 font-oswald text-sm tracking-widest uppercase text-white/50 hidden md:table-cell">Должность</th>
                    <th className="text-left px-6 py-4 font-oswald text-sm tracking-widest uppercase text-white/50">Компания</th>
                  </tr>
                </thead>
                <tbody>
                  {SPEAKERS.map((sp, i) => (
                    <tr
                      key={sp.name + i}
                      className="transition-colors duration-200 border-t"
                      style={{
                        borderColor: "rgba(157,78,221,0.1)",
                        background: i % 2 === 0 ? "rgba(13,0,21,0.4)" : "rgba(45,0,75,0.15)",
                      }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-oswald font-bold text-xs text-white"
                            style={{ background: `linear-gradient(135deg, ${sp.color}80, ${sp.color}30)`, border: `1px solid ${sp.color}50` }}
                          >
                            {sp.initials}
                          </div>
                          <span className="font-golos font-medium text-white text-sm">{sp.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/60 font-golos hidden md:table-cell">{sp.role}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-golos font-medium" style={{ color: sp.color }}>{sp.company}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BLOCK: TEAM ── */}
      <section id="team" className="py-24" style={{ background: "linear-gradient(180deg, #0D0015 0%, #1a002e 100%)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[#FF00FF] font-oswald tracking-widest text-sm uppercase">Организаторы</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 uppercase">
                Наша команда <span style={{ color: "#9D4EDD" }}>экспертов</span>
              </h2>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">

            {/* ── Елена Ермакова ── */}
            <Reveal delay={0.1}>
              <div
                className="rounded-3xl border p-8 md:p-12"
                style={{
                  background: "rgba(45,0,75,0.3)",
                  borderColor: "rgba(157,78,221,0.25)",
                  boxShadow: "0 0 80px rgba(157,78,221,0.1)",
                }}
              >
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="flex-shrink-0 flex flex-col items-center gap-4">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 40px rgba(157,78,221,0.4)" }}>
                      <img src="https://cdn.poehali.dev/projects/d4af42ec-5015-483c-b71c-6bf32723c131/bucket/7801ca27-6db1-4d84-9120-b618ccf95fe2.png" alt="Елена Ермакова" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-oswald text-xl font-bold uppercase">ЕЛЕНА ЕРМАКОВА</h3>
                      <p className="text-xs text-white/50 mt-1 font-golos leading-snug max-w-[180px]">Эксперт в автоиндустрии.<br />Управление программой внедрения</p>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Экспертиза</span></div>
                      <ul className="space-y-1.5 font-golos text-sm text-white/70">
                        {["Управление проектами и программами", "Организация тендерных закупок", "Бизнес-процессы дилера, дистрибьютора, автопроизводителя", "Операционная эффективность", "Разработка и внедрение стандартов обслуживания"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span style={{ color: "#9D4EDD" }} className="mt-1 flex-shrink-0">▸</span><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Опыт</span></div>
                      <ul className="space-y-1.5 font-golos text-sm text-white/70">
                        {["15+ лет в автобизнесе", "Исполнительный директор АвтоСпецЦентр", "Директорские позиции в Hyundai Motor CIS", "FNGroup, СОЛЛЕРС"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span style={{ color: "#9D4EDD" }} className="mt-1 flex-shrink-0">▸</span><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Достижения</span></div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { num: "2.2×", label: "Рост рентабельности по EBITDA" },
                          { num: "−35%", label: "Прямые трудовые затраты в Валовой прибыли" },
                          { num: "−30%", label: "Эффект тендерных закупок в 1-й год" },
                          { num: "5×", label: "Масштабирование Hyundai Training Academy за 5 лет" },
                        ].map((a, i) => (
                          <div key={i} className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: "rgba(157,78,221,0.12)", border: "1px solid rgba(157,78,221,0.2)" }}>
                            <span className="font-oswald text-2xl font-bold" style={{ color: "#FF00FF" }}>{a.num}</span>
                            <span className="font-golos text-xs text-white/60 leading-snug">{a.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Квалификация</span></div>
                      <div className="flex flex-wrap gap-3 font-golos text-sm text-white/70">
                        <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(255,0,255,0.08)", border: "1px solid rgba(255,0,255,0.2)" }}>МГТУ им. Баумана, инженер-электроник</span>
                        <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(255,0,255,0.08)", border: "1px solid rgba(255,0,255,0.2)" }}>МГУ им. Ломоносова, психолог</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Кирилл Лядов ── */}
            <Reveal delay={0.15}>
              <div
                className="rounded-3xl border p-8 md:p-12"
                style={{
                  background: "rgba(45,0,75,0.3)",
                  borderColor: "rgba(157,78,221,0.25)",
                  boxShadow: "0 0 80px rgba(157,78,221,0.1)",
                }}
              >
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="flex-shrink-0 flex flex-col items-center gap-4">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 40px rgba(157,78,221,0.4)" }}>
                      <img src="https://cdn.poehali.dev/projects/d4af42ec-5015-483c-b71c-6bf32723c131/bucket/7804d044-b5cb-459a-9441-8f9cbae480ca.png" alt="Кирилл Лядов" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-oswald text-xl font-bold uppercase">КИРИЛЛ ЛЯДОВ</h3>
                      <p className="text-xs text-white/50 mt-1 font-golos leading-snug max-w-[180px]">Стратегия ИИ и разработка ИИ систем</p>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Экспертиза</span></div>
                      <ul className="space-y-1.5 font-golos text-sm text-white/70">
                        {["Стратегия и архитектура ИИ", "Выбор и внедрение ИИ платформ", "Качество и защита данных"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span style={{ color: "#9D4EDD" }} className="mt-1 flex-shrink-0">▸</span><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Опыт</span></div>
                      <ul className="space-y-1.5 font-golos text-sm text-white/70">
                        {["10+ лет в компаниях Accenture, PWC, EY", "Управляет командами 100–200 человек"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span style={{ color: "#9D4EDD" }} className="mt-1 flex-shrink-0">▸</span><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Достижения</span></div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { num: "$200M+", label: "Экономический эффект для клиентов в РФ и на Ближнем Востоке" },
                          { num: "30+", label: "ИИ систем разработано и внедрено" },
                          { num: "+17%", label: "Рост маржи в e-commerce благодаря ИИ" },
                          { num: "−15%", label: "Снижение операционных затрат для добывающей компании" },
                        ].map((a, i) => (
                          <div key={i} className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: "rgba(157,78,221,0.12)", border: "1px solid rgba(157,78,221,0.2)" }}>
                            <span className="font-oswald text-2xl font-bold" style={{ color: "#FF00FF" }}>{a.num}</span>
                            <span className="font-golos text-xs text-white/60 leading-snug">{a.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Квалификация</span></div>
                      <div className="flex flex-wrap gap-3 font-golos text-sm text-white/70">
                        <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(255,0,255,0.08)", border: "1px solid rgba(255,0,255,0.2)" }}>Магистр, Информационные системы и ИИ, МИЭМ</span>
                        <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(255,0,255,0.08)", border: "1px solid rgba(255,0,255,0.2)" }}>CDMP</span>
                        <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(255,0,255,0.08)", border: "1px solid rgba(255,0,255,0.2)" }}>DipIFR ACCA</span>
                        <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(255,0,255,0.08)", border: "1px solid rgba(255,0,255,0.2)" }}>PMP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Анастасия Емельянова ── */}
            <Reveal delay={0.15}>
              <div
                className="rounded-3xl border p-8 md:p-12"
                style={{
                  background: "rgba(45,0,75,0.3)",
                  borderColor: "rgba(157,78,221,0.25)",
                  boxShadow: "0 0 80px rgba(157,78,221,0.1)",
                }}
              >
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="flex-shrink-0 flex flex-col items-center gap-4">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 40px rgba(157,78,221,0.4)" }}>
                      <img src="https://cdn.poehali.dev/projects/d4af42ec-5015-483c-b71c-6bf32723c131/bucket/14b04c74-239d-401b-b9e7-4fdd94af4ab7.png" alt="Анастасия Емельянова" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-oswald text-xl font-bold uppercase">АНАСТАСИЯ ЕМЕЛЬЯНОВА</h3>
                      <p className="text-xs text-white/50 mt-1 font-golos leading-snug max-w-[180px]">Эксперт в сфере обучения персонала и внедрения программ ИИ</p>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Экспертиза</span></div>
                      <ul className="space-y-1.5 font-golos text-sm text-white/70">
                        {[
                          "Стратегическое управление обучением (T&D): построение систем обучения с нуля",
                          "Управление end-to-end проектами: полный цикл от анализа до оценки по модели Киркпатрика",
                          "Гибридные и цифровые форматы: стриминги, вебинары, VR-тренажёры",
                          "Бизнес-партнёрство с ключевыми стейкхолдерами дилерской сети",
                          "Перевод сложных технических тем в доступные программы для линейного персонала",
                          "Оптимизация через стандартизацию: аудит процессов и создание стандартов работы",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span style={{ color: "#9D4EDD" }} className="mt-1 flex-shrink-0">▸</span><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Опыт</span></div>
                      <ul className="space-y-1.5 font-golos text-sm text-white/70">
                        {["12+ лет в корпоративном обучении", "X5 Retail Group, Яндекс, Nissan Manufacturing Rus, McKinsey & Company", "Автомобильная отрасль, ритейл, IT", "Техническое и управленческое обучение"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span style={{ color: "#9D4EDD" }} className="mt-1 flex-shrink-0">▸</span><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Достижения</span></div>
                      <ul className="space-y-1.5 font-golos text-sm text-white/70">
                        {[
                          "X5: стандарты АТП, система поддержки экспертов 24/7",
                          "Яндекс: NPS программ обучения 70–90%",
                          "Яндекс: оценка по Киркпатрику, подкаст для B2B-клиентов",
                          "Nissan: VR-обучение с удовлетворённостью 95%",
                          "Nissan: система сертификации руководителей",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span style={{ color: "#9D4EDD" }} className="mt-1 flex-shrink-0">▸</span><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Квалификация</span></div>
                      <div className="flex flex-wrap gap-3 font-golos text-sm text-white/70">
                        <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(255,0,255,0.08)", border: "1px solid rgba(255,0,255,0.2)" }}>Digital-тренер и методолог</span>
                        <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(255,0,255,0.08)", border: "1px solid rgba(255,0,255,0.2)" }}>Сертифицированный бизнес-тренер</span>
                        <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(255,0,255,0.08)", border: "1px solid rgba(255,0,255,0.2)" }}>Английский язык C1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Алексей Николаев ── */}
            <Reveal delay={0.15}>
              <div
                className="rounded-3xl border p-8 md:p-12"
                style={{
                  background: "rgba(45,0,75,0.3)",
                  borderColor: "rgba(157,78,221,0.25)",
                  boxShadow: "0 0 80px rgba(157,78,221,0.1)",
                }}
              >
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="flex-shrink-0 flex flex-col items-center gap-4">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 40px rgba(157,78,221,0.4)" }}>
                      <img src="https://cdn.poehali.dev/projects/d4af42ec-5015-483c-b71c-6bf32723c131/bucket/ae10706c-5134-4ac0-b1f6-280942b17523.png" alt="Алексей Николаев" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-oswald text-xl font-bold uppercase">АЛЕКСЕЙ НИКОЛАЕВ</h3>
                      <p className="text-xs text-white/50 mt-1 font-golos leading-snug max-w-[180px]">Консультант для автодилеров по внедрению ИИ, бизнес-тренер</p>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Экспертиза</span></div>
                      <ul className="space-y-1.5 font-golos text-sm text-white/70">
                        {[
                          "Обучение сотрудников автодилеров от механиков до директоров",
                          "Аудит бизнеса автодилеров",
                          "Сертификация персонала автодилеров",
                          "Стратегия и архитектура ИИ",
                          "Выбор и внедрение ИИ инструментов, создание платформ",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span style={{ color: "#9D4EDD" }} className="mt-1 flex-shrink-0">▸</span><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Опыт</span></div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {[
                          { num: "25+", label: "лет в автобизнесе" },
                          { num: "4000+", label: "тренингов" },
                          { num: "26", label: "проектов цифровизации с ИИ" },
                        ].map((a, i) => (
                          <div key={i} className="rounded-xl px-3 py-2 text-center" style={{ background: "rgba(157,78,221,0.12)", border: "1px solid rgba(157,78,221,0.2)" }}>
                            <div className="font-oswald text-xl font-bold" style={{ color: "#FF00FF" }}>{a.num}</div>
                            <div className="font-golos text-xs text-white/50 leading-snug mt-1">{a.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Достижения</span></div>
                      <ul className="space-y-1.5 font-golos text-sm text-white/70">
                        {[
                          "Передал клиентам 49 автомобилей в месяц, обеспечил сток на 6 месяцев вперёд",
                          "Вывел сервисное подразделение в лидеры по NPS среди 236 предприятий бренда",
                          "Провёл более 4000 тренингов, обучил более 10 000 специалистов",
                          "Увеличил выручку сервиса на 20% за 1 месяц без финансовых вложений",
                          "Улучшил показатели маркетинга на 68% за счёт применения ИИ инструментов",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span style={{ color: "#9D4EDD" }} className="mt-1 flex-shrink-0">▸</span><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Квалификация</span></div>
                      <div className="flex flex-wrap gap-3 font-golos text-sm text-white/70">
                        {["Инженер-механик", "Сертифицированный бизнес-тренер, аудитор, асессор", "Лучший продавец нескольких автомобильных брендов", "Специалист по ИИ"].map((q, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-full" style={{ background: "rgba(255,0,255,0.08)", border: "1px solid rgba(255,0,255,0.2)" }}>{q}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Иван Староастин ── */}
            <Reveal delay={0.15}>
              <div
                className="rounded-3xl border p-8 md:p-12"
                style={{
                  background: "rgba(45,0,75,0.3)",
                  borderColor: "rgba(157,78,221,0.25)",
                  boxShadow: "0 0 80px rgba(157,78,221,0.1)",
                }}
              >
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="flex-shrink-0 flex flex-col items-center gap-4">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 40px rgba(157,78,221,0.4)" }}>
                      <img src="https://cdn.poehali.dev/projects/d4af42ec-5015-483c-b71c-6bf32723c131/bucket/f34f3f16-3893-4627-bd13-66e1d79615e4.png" alt="Иван Староастин" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-oswald text-xl font-bold uppercase">ИВАН СТАРОАСТИН</h3>
                      <p className="text-xs text-white/50 mt-1 font-golos leading-snug max-w-[180px]">Внедрение ИИ в бизнес-процессы</p>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Экспертиза</span></div>
                      <ul className="space-y-1.5 font-golos text-sm text-white/70">
                        {[
                          "ИИ-стратегия и архитектура применения ИИ",
                          "Внедрение ИИ в бизнес-процессы (AI-native processes)",
                          "Использование ИИ в регулируемой среде",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span style={{ color: "#9D4EDD" }} className="mt-1 flex-shrink-0">▸</span><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Опыт</span></div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        {[
                          { num: "15+", label: "лет в цифровых платформах" },
                          { num: "700+", label: "человек под управлением" },
                        ].map((a, i) => (
                          <div key={i} className="rounded-xl px-3 py-2 text-center" style={{ background: "rgba(157,78,221,0.12)", border: "1px solid rgba(157,78,221,0.2)" }}>
                            <div className="font-oswald text-xl font-bold" style={{ color: "#FF00FF" }}>{a.num}</div>
                            <div className="font-golos text-xs text-white/50 leading-snug mt-1">{a.label}</div>
                          </div>
                        ))}
                      </div>
                      <p className="font-golos text-xs text-white/50">Альфа, Сбер, ВТБ и другие крупнейшие компании</p>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Примеры проектов</span></div>
                      <ul className="space-y-1.5 font-golos text-sm text-white/70">
                        {[
                          "Внедрение ИИ-агентов в 90% внутренней разработки (100% кода и тестов) и перевод в полностью автоматический режим",
                          "Создание фабрики специализированных ИИ-агентов под задачу",
                          "Корпоративная Q&A-система по базе знаний с контролем качества ответов",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2"><span style={{ color: "#9D4EDD" }} className="mt-1 flex-shrink-0">▸</span><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-3"><div className="w-1 h-4 rounded-full" style={{ background: "#FF00FF" }} /><span className="font-oswald text-sm tracking-widest uppercase" style={{ color: "#FF00FF" }}>Подход</span></div>
                      <p className="font-golos text-sm text-white/60 leading-relaxed">Диагностика процесса и ограничений → проектирование целевой схемы → запуск управляемого контура качества → передача с документацией и метриками</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Инна Петухова ── */}
            <Reveal delay={0.15}>
              <div
                className="rounded-3xl border p-8 md:p-12"
                style={{
                  background: "rgba(45,0,75,0.3)",
                  borderColor: "rgba(157,78,221,0.25)",
                  boxShadow: "0 0 80px rgba(157,78,221,0.1)",
                }}
              >
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="flex-shrink-0 flex flex-col items-center gap-4">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 40px rgba(157,78,221,0.4)" }}>
                      <img src="https://cdn.poehali.dev/projects/d4af42ec-5015-483c-b71c-6bf32723c131/bucket/3c31a22f-e25a-4095-b52f-743990fba8f0.png" alt="Инна Петухова" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-oswald text-xl font-bold uppercase">ИННА ПЕТУХОВА</h3>
                      <p className="text-xs text-white/50 mt-1 font-golos leading-snug max-w-[180px]">Генеральный директор Auto Business Consulting</p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-6 justify-center">
                    <div
                      className="p-6 rounded-2xl"
                      style={{ background: "rgba(157,78,221,0.08)", border: "1px solid rgba(157,78,221,0.2)" }}
                    >
                      <p className="font-golos text-base text-white/80 leading-relaxed">
                        Инна Петухова — основатель и генеральный директор Auto Business Consulting. Эксперт в области стратегического развития автобизнеса, организации конференций и внедрения ИИ-решений в автомобильной индустрии.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <a href="mailto:Inna.Petuhova@autobisconsult.ru" className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-golos text-sm transition-all hover:scale-105" style={{ background: "rgba(157,78,221,0.12)", border: "1px solid rgba(157,78,221,0.3)", color: "#9D4EDD" }}>
                        <Icon name="Mail" size={15} />
                        Inna.Petuhova@autobisconsult.ru
                      </a>
                      <a href="tel:+79852320005" className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-golos text-sm transition-all hover:scale-105" style={{ background: "rgba(157,78,221,0.12)", border: "1px solid rgba(157,78,221,0.3)", color: "#9D4EDD" }}>
                        <Icon name="Phone" size={15} />
                        +7 985 232-00-05
                      </a>
                      <a href="https://t.me/abc_cons" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-golos text-sm transition-all hover:scale-105" style={{ background: "rgba(157,78,221,0.12)", border: "1px solid rgba(157,78,221,0.3)", color: "#9D4EDD" }}>
                        <Icon name="Send" size={15} />
                        @abc_cons
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

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
                    onClick={() => navigate(`/buy?ticket=${ticket.id}`)}
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
                  onClick={() => navigate("/buy?ticket=online")}
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
    </>
  );
}