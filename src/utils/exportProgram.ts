import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  HeadingLevel,
  ShadingType,
} from "docx";
import { saveAs } from "file-saver";

const PROGRAM = [
  { time: "09:30 – 10:00", type: "break", title: "Регистрация, приветственный кофе", speaker: null, company: "Вход в зал, знакомство, живое общение до начала" },
  { time: "10:00 – 12:30", type: "session", title: "СЕССИЯ 1: КЛИЕНТСКИЙ ОПЫТ И ПРОДАЖИ", speaker: null, company: "Как не терять клиентов и продавать больше в новой реальности" },
  { time: "10:00 – 10:30", type: "talk", title: "Клиент нового поколения: чего он на самом деле ждёт от дилера?", speaker: "Александр Кулагин", company: "Исполнительный директор, Чанган Моторс РУС" },
  { time: "10:30 – 11:00", type: "talk", title: "Продажи 2026: как не потерять клиента в первые 5 минут", speaker: "Алексей Почечуев", company: "Директор по продажам, Geely" },
  { time: "11:00 – 11:30", type: "talk", title: "Цифровые помощники в продажах: что реально работает?", speaker: "Приглашённый эксперт (уточняется)", company: "" },
  { time: "11:30 – 12:00", type: "talk", title: "Финансовые продукты и ИИ: как увеличить средний чек", speaker: "Ирина Козлова, Алексей Лагутин", company: "СБЕР КРЕДИТОВАНИЕ / СБЕР СТРАХОВАНИЕ" },
  { time: "12:00 – 12:30", type: "panel", title: "Панельная дискуссия: Ошибки, которые мы совершали — и чему научились", speaker: "Все спикеры сессии", company: null },
  { time: "12:30 – 13:30", type: "break", title: "Обед и нетворкинг", speaker: null, company: "Полноценный перерыв для неформального общения и знакомств" },
  { time: "13:30 – 15:30", type: "session", title: "СЕССИЯ 2: СЕРВИС — ЭФФЕКТИВНОСТЬ И ЛОЯЛЬНОСТЬ", speaker: null, company: "Где сервис превращается в главный источник прибыли" },
  { time: "13:30 – 14:00", type: "talk", title: "Почему сервис приносит больше денег, чем продажи (и как это сделать у себя)", speaker: "Дмитрий Денисов", company: "Директор Академии, АВТОВАЗ" },
  { time: "14:00 – 14:30", type: "talk", title: "Предсказать и предотвратить: как ИИ помогает не терять клиентов на сервисе", speaker: "Дмитрий Новиков", company: "Директор клиентской службы, АВТОВАЗ" },
  { time: "14:30 – 15:00", type: "talk", title: "Запчасти, склады, логистика: где прячутся потери и как их найти", speaker: "Приглашённый эксперт (уточняется)", company: "" },
  { time: "15:00 – 15:30", type: "talk", title: "Допродажи в сервисе: как предлагать, чтобы не раздражать", speaker: "Приглашённый эксперт (уточняется)", company: "" },
  { time: "15:30 – 17:00", type: "session", title: "СЕССИЯ 3: ВНУТРЕННЯЯ КУХНЯ — HR, МАРКЕТИНГ, КЛИЕНТСКИЙ СЕРВИС", speaker: null, company: "Как растить людей, продавать не навязчиво и сохранять репутацию" },
  { time: "15:30 – 16:00", type: "talk", title: "Маркетинг, который продаёт: от массовых рассылок к разговору с каждым", speaker: "Василий Чеботарёв", company: "Руководитель отдела маркетинга, Мотор Инвест" },
  { time: "16:00 – 16:30", type: "talk", title: "Обучать нельзя уволить: как ИИ помогает растить сотрудников быстрее", speaker: "Ирина Клебанович", company: "Руководитель тренинг-центра, Джетур" },
  { time: "16:30 – 17:00", type: "talk", title: "Клиент написал плохой отзыв. Что дальше? ИИ против репутационных рисков", speaker: "Приглашённый эксперт (уточняется)", company: "" },
  { time: "17:00 – 17:45", type: "session", title: "СЕССИЯ 4: ВНЕДРЕНИЕ ИИ — С ЧЕГО НАЧАТЬ?", speaker: null, company: "Практические инструменты и готовые решения, которые можно забрать с собой" },
  { time: "17:00 – 17:20", type: "talk", title: "Первый шаг: с какого отдела начать, чтобы не прогореть", speaker: "Приглашённый эксперт (уточняется)", company: "" },
  { time: "17:20 – 17:40", type: "talk", title: "Инструменты и промпты, которые работают (и которые не работают)", speaker: "Олег Габидулин", company: "Операционный директор по запуску AI, Яндекс (Латинская Америка, Турция)" },
  { time: "17:00 – 17:45", type: "talk", title: "Пять стратегических решений, которые руководитель автобизнеса должен принять, чтобы ИИ работал на капитализацию", speaker: "Кирилл Лядов", company: "Эксперт, Автобизнес Консалтинг" },
  { time: "17:00 – 17:45", type: "talk", title: "Личные и командные ИИ-ассистенты: архитектура новой продуктивности", speaker: "Иван Староастин", company: "Эксперт, Автобизнес Консалтинг" },
  { time: "17:40 – 17:45", type: "panel", title: "Блиц-ответы на ваши вопросы", speaker: "Все эксперты сессии", company: null },
  { time: "17:45 – 18:00", type: "panel", title: "Заключительное слово и розыгрыш", speaker: null, company: "Призы от партнёров, подведение итогов, общая фотография" },
  { time: "18:00 – 20:00", type: "break", title: "Фуршет и неформальное общение", speaker: null, company: "Продолжение разговоров в неофициальной обстановке, новые знакомства" },
];

const COLORS = {
  session: "4A0080",
  break: "2D2D2D",
  talk: "FFFFFF",
  panel: "F5F0FF",
  workshop: "FFF5E6",
  header: "6B00CC",
};

const noBorder = {
  top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
};

function makeRow(item: typeof PROGRAM[0]): TableRow {
  const isSession = item.type === "session";
  const isBreak = item.type === "break";
  const isDark = isSession || isBreak;

  const bgColor = isSession ? COLORS.session : isBreak ? COLORS.break : item.type === "panel" ? "EDE7F6" : item.type === "workshop" ? "FFF3E0" : "FFFFFF";
  const textColor = isDark ? "FFFFFF" : "1A1A2E";
  const timeColor = isDark ? "DDBBFF" : "7B2FBE";

  const speakerLines: TextRun[] = [];
  if (item.speaker) {
    speakerLines.push(
      new TextRun({ text: "", break: 1 }),
      new TextRun({ text: item.speaker, bold: true, size: 18, color: "7B2FBE" }),
    );
    if (item.company) {
      speakerLines.push(
        new TextRun({ text: "  " + item.company, size: 16, color: "888888" }),
      );
    }
  }

  return new TableRow({
    children: [
      new TableCell({
        width: { size: 2000, type: WidthType.DXA },
        borders: noBorder,
        shading: { type: ShadingType.SOLID, color: bgColor },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 80, after: 80 },
            children: [
              new TextRun({
                text: item.time,
                bold: true,
                size: isSession ? 18 : 17,
                color: timeColor,
                font: "Arial",
              }),
            ],
          }),
        ],
      }),
      new TableCell({
        width: { size: 7500, type: WidthType.DXA },
        borders: noBorder,
        shading: { type: ShadingType.SOLID, color: bgColor },
        children: [
          new Paragraph({
            spacing: { before: 80, after: 80 },
            children: [
              new TextRun({
                text: item.title,
                bold: isSession || isBreak,
                size: isSession ? 20 : 18,
                color: textColor,
                font: "Arial",
              }),
              ...speakerLines,
            ],
          }),
        ],
      }),
    ],
  });
}

export async function exportProgramDocx() {
  const rows = PROGRAM.map(makeRow);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 900, right: 900 },
          },
        },
        children: [
          new Paragraph({
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "ИИ В АВТОБИЗНЕСЕ 2025",
                bold: true,
                size: 40,
                color: COLORS.header,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: "Программа конференции",
                size: 26,
                color: "555555",
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: "Москва • 2025",
                size: 22,
                color: "999999",
                font: "Arial",
                italics: true,
              }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows,
          }),
          new Paragraph({
            spacing: { before: 400 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "ai-auto.ru  •  info@ai-auto.ru",
                size: 18,
                color: "AAAAAA",
                font: "Arial",
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "Программа_конференции_ИИ_в_автобизнесе_2025.docx");
}