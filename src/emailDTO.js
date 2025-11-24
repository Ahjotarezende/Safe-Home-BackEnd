const nodemailer = require("nodemailer");

function sendEmail(nameTo, emailTo, monitoredName, incident, location) {
    const nameFrom = "SafeHome - Avisos";
    const emailFrom = "suporte@safehome.com.br";
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "e4c3589536fdd7",
            pass: "d08c35ef0d0eac"
        }
    });

    const html = `<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alerta de Incidente</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background-color: #dc3545;
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
        }
        .alert-icon {
            font-size: 48px;
            margin-bottom: 10px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            padding: 30px 20px;
        }
        .alert-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin-bottom: 20px;
        }
        .alert-box p {
            margin: 5px 0;
            color: #856404;
        }
        .info-section {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .info-row {
            display: table;
            width: 100%;
            margin-bottom: 10px;
        }
        .info-label {
            font-weight: bold;
            color: #333;
            display: table-cell;
            width: 40%;
        }
        .info-value {
            color: #555;
            display: table-cell;
        }
        .cta-button {
            display: inline-block;
            background-color: #dc3545;
            color: #ffffff;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
        }
        .footer {
            background-color: #343a40;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 12px;
        }
        .footer p {
            margin: 5px 0;
        }
        @media only screen and (max-width: 600px) {
            .info-row {
                display: block;
            }
            .info-label, .info-value {
                display: block;
                width: 100%;
            }
            .info-label {
                margin-bottom: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="alert-icon">⚠️</div>
            <h1>ALERTA DE INCIDENTE</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px;">Ação Imediata Necessária</p>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="alert-box">
                <p style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">🚨 INCIDENTE REGISTRADO</p>
                <p>Uma pessoa monitorada registrou um incidente e necessita de socorro imediato.</p>
            </div>

            <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">Informações do Incidente</h2>
            
            <div class="info-section">
                <div class="info-row">
                    <span class="info-label">Pessoa Monitorada:</span>
                    <span class="info-value">${monitoredName}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Data/Hora:</span>
                    <span class="info-value">${new Date().toLocaleString()}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Tipo de Incidente:</span>
                    <span class="info-value">${incident}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Localização:</span>
                    <span class="info-value">${location}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Status:</span>
                    <span class="info-value" style="color: #dc3545; font-weight: bold;">AGUARDANDO SOCORRO</span>
                </div>
            </div>

            <p style="color: #333; line-height: 1.6;">
                Por favor, tome as medidas necessárias imediatamente para prestar socorro à pessoa monitorada. 
                Este é um alerta prioritário que requer atenção urgente.
            </p>

            <p style="color: #666; font-size: 14px; margin-top: 20px;">
                <strong>Importante:</strong> Este email foi gerado automaticamente pelo sistema de monitoramento. 
                Não responda a este email. Em caso de dúvidas, entre em contato com a central de atendimento.
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Sistema de Monitoramento</strong></p>
            <p>Central de Atendimento: (31) 3333-4444</p>
            <p>Email: suporte@safehome.com.br</p>
            <p style="margin-top: 15px;">&copy; 2025 Todos os direitos reservados</p>
        </div>
    </div>
</body>
</html>`

    transport.sendMail({
        from: `${nameFrom} <${emailFrom}>`,
        to: `${nameTo} <${emailTo}>`,
        subject: "Aviso de incidente registrado de um dos seus monitorados!",
        html: html
    })
}

exports.sendEmail = sendEmail