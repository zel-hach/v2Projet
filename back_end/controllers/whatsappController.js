import { isTwilioReady, sendWhatsAppMessage } from "../services/twilioWhatsApp.js";

import { Resend } from 'resend';


export async function postSendWhatsApp(req, res) {
  try {
    const { phone, message } = req.body || {};

    if (!phone || !String(message || "").trim()) {
      return res.status(400).json({ message: "phone et message sont requis" });
    }
    const resend = new Resend('re_eMK81PFN_K62dcJ9sdJhVooWvFQMKLdfi');
    const result = await resend.emails.send({ 
    from: 'onboarding@resend.dev',
    to: 'zineb.ell.zee@gmail.com',
    subject: 'Message de la part de l\'administrateur',
    html: message,
  });
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  }
    return res.status(200).json({ message: "Message envoyé", sid: result.id });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Erreur Resend" });
  }
}
