import smtplib
from email.message import EmailMessage

# Constantes
SENDER_EMAIL = "relatorio.semiolog@gmail.com"
PASSWORD = "rbdm ofir mgao ybyx"
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

def send_report_email(receiver_email, report_text):
    msg = EmailMessage()
    msg['From'] = f"SemioLog <{SENDER_EMAIL}>"
    msg['To'] = receiver_email
    msg['Subject'] = "Relatório - SemioLog"
    msg.add_header('Content-Language', 'pt-BR')

    html_content = f"""
    <html lang="pt-BR">
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, Helvetica, sans-serif; white-space: pre-wrap; font-size: 14px; color: #333;">
{report_text}
        </body>
    </html>
    """
    
    # Define o conteúdo da mensagem diretamente como HTML
    msg.set_content(html_content, subtype='html')

    try:
        # O bloco 'with' garante que o server.quit() seja chamado automaticamente
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, PASSWORD)
            server.send_message(msg)
            
        return True, "E-mail enviado com sucesso!"
    except Exception as e:
        return False, str(e)