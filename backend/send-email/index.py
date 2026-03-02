import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = "smtp.mastermail.ru"
SMTP_PORT = 465
SMTP_USER = os.environ.get("SMTP_USER", "inna.petuhova@autobisconsult.ru")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "12345678")
TO_EMAIL = "inna.petuhova@autobisconsult.ru"

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def send_mail(subject: str, html: str):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = SMTP_USER
    msg["To"] = TO_EMAIL
    msg.attach(MIMEText(html, "html", "utf-8"))
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, TO_EMAIL, msg.as_string())


def handler(event: dict, context) -> dict:
    """Отправляет письмо с данными формы на почту организатора конференции."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    form_type = body.get("type")

    if form_type == "speaker":
        subject = "Новая заявка спикера — AI Автобизнес 2025"
        html = f"""
        <h2>Заявка спикера</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><td><b>Имя:</b></td><td>{body.get('name','')}</td></tr>
          <tr><td><b>Компания:</b></td><td>{body.get('company','')}</td></tr>
          <tr><td><b>Должность:</b></td><td>{body.get('role','')}</td></tr>
          <tr><td><b>Тема:</b></td><td>{body.get('topic','')}</td></tr>
          <tr><td><b>LinkedIn/сайт:</b></td><td>{body.get('link','')}</td></tr>
          <tr><td><b>Email:</b></td><td>{body.get('email','')}</td></tr>
          <tr><td><b>Описание:</b></td><td>{body.get('description','')}</td></tr>
        </table>
        """
    elif form_type == "partner":
        subject = "Новая заявка партнёра — AI Автобизнес 2025"
        html = f"""
        <h2>Заявка партнёра</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><td><b>Компания:</b></td><td>{body.get('company','')}</td></tr>
          <tr><td><b>Имя:</b></td><td>{body.get('name','')}</td></tr>
          <tr><td><b>Должность:</b></td><td>{body.get('role','')}</td></tr>
          <tr><td><b>Пакет:</b></td><td>{body.get('package','')}</td></tr>
          <tr><td><b>Email:</b></td><td>{body.get('email','')}</td></tr>
          <tr><td><b>Телефон:</b></td><td>{body.get('phone','')}</td></tr>
        </table>
        """
    elif form_type == "contact":
        subject = f"Обратная связь: {body.get('subject','—')} — AI Автобизнес 2025"
        html = f"""
        <h2>Форма обратной связи</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><td><b>Имя:</b></td><td>{body.get('name','')}</td></tr>
          <tr><td><b>Email:</b></td><td>{body.get('email','')}</td></tr>
          <tr><td><b>Тема:</b></td><td>{body.get('subject','')}</td></tr>
          <tr><td><b>Сообщение:</b></td><td>{body.get('message','')}</td></tr>
        </table>
        """
    elif form_type == "ticket":
        subject = f"Новая заявка участника: {body.get('ticket','—')} — AI Автобизнес 2026"
        html = f"""
        <h2>Заявка участника на билет</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><td><b>Билет:</b></td><td>{body.get('ticket','')}</td></tr>
          <tr><td><b>Стоимость:</b></td><td>{body.get('price','')}</td></tr>
          <tr><td><b>Фамилия Имя:</b></td><td>{body.get('fullName','')}</td></tr>
          <tr><td><b>Телефон:</b></td><td>{body.get('phone','')}</td></tr>
          <tr><td><b>Email для счёта:</b></td><td>{body.get('billingEmail','')}</td></tr>
          <tr><td><b>Компания:</b></td><td>{body.get('company','')}</td></tr>
          <tr><td><b>ИНН:</b></td><td>{body.get('inn','')}</td></tr>
          <tr><td><b>КПП:</b></td><td>{body.get('kpp','')}</td></tr>
          <tr><td><b>Юридический адрес:</b></td><td>{body.get('legalAddress','')}</td></tr>
          <tr><td><b>Кол-во мест:</b></td><td>{body.get('seats','')}</td></tr>
          <tr><td><b>Контракт ABC:</b></td><td>{body.get('contract','')}</td></tr>
          <tr><td><b>Промокод:</b></td><td>{body.get('promo','')}</td></tr>
        </table>
        """
    else:
        return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "unknown type"})}

    send_mail(subject, html)
    return {"statusCode": 200, "headers": CORS_HEADERS, "body": json.dumps({"ok": True})}