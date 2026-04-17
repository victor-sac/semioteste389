# routes.py
from main import app
from flask import render_template, request, jsonify
from services.email_service import send_report_email

@app.route("/")
def homepage():
    return render_template('main.html')

@app.route("/semio")
def semiolog():
    return render_template('index.html')

@app.route("/ausculta")
def ausculta():
    return render_template('ausculta.html')

@app.route("/precordio")
def precordio():
    return render_template('precordio.html')

@app.route("/versao1")
def versao1():
    return render_template('versao1.html')

@app.route("/api/send-email", methods=["POST"])
def send_email():
    # O "or {}" protege contra requests sem body
    data = request.get_json() or {} 
    email, report = data.get('email'), data.get('report')

    if not email or not report:
        return jsonify({"success": False, "message": "E-mail e relatório são obrigatórios."}), 400

    success, message = send_report_email(email, report)
    
    # Retorno limpo usando operador ternário para o status HTTP
    status_code = 200 if success else 500
    return jsonify({"success": success, "message": message}), status_code