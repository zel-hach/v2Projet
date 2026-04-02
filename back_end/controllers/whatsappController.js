import { isTwilioReady, sendWhatsAppMessage } from "../services/twilioWhatsApp.js";

export async function postSendWhatsApp(req, res) {
  try {
    const { phone, message } = req.body || {};

    if (!phone || !String(message || "").trim()) {
      return res.status(400).json({ message: "phone et message sont requis" });
    }

    if (!isTwilioReady()) {
      return res.status(503).json({
        message:
          "WhatsApp (Twilio) non configuré. Ajoutez dans .env : TWILIO_ACCOUNT_SID (commence par AC), TWILIO_AUTH_TOKEN, et optionnellement TWILIO_WHATSAPP_FROM (ex. whatsapp:+14155238886).",
      });
    }

    const result = await sendWhatsAppMessage(phone, message);
    return res.status(200).json({ message: "Message envoyé", sid: result.sid });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Erreur Twilio" });
  }
}
