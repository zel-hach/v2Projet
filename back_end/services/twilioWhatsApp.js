import twilio from "twilio";

let cachedClient = null;

/**
 * Twilio exige un Account SID qui commence par "AC".
 * On n'instancie le client que si les variables d'environnement sont valides.
 */
export function isTwilioReady() {
  const sid = process.env.TWILIO_ACCOUNT_SID?.trim();
  const token = process.env.TWILIO_AUTH_TOKEN?.trim();
  return Boolean(sid?.startsWith("AC") && token);
}

function getTwilioClient() {
  if (!isTwilioReady()) return null;
  if (!cachedClient) {
    cachedClient = twilio(
      process.env.TWILIO_ACCOUNT_SID.trim(),
      process.env.TWILIO_AUTH_TOKEN.trim()
    );
  }
  return cachedClient;
}

/**
 * @param {string} phone - chiffres (ex. 2126...) comme le frontend
 * @param {string} body - texte du message
 */
export async function sendWhatsAppMessage(phone, body) {
  const client = getTwilioClient();
  if (!client) {
    throw new Error(
      "Twilio non configuré : TWILIO_ACCOUNT_SID doit commencer par AC et TWILIO_AUTH_TOKEN doit être défini dans .env"
    );
  }

  const digits = String(phone || "").replace(/\D/g, "");
  if (!digits) {
    throw new Error("Numéro de téléphone invalide");
  }

  const to = `whatsapp:+${digits}`;

  let from = process.env.TWILIO_WHATSAPP_FROM?.trim() || "whatsapp:+14155238886";
  if (!from.startsWith("whatsapp:")) {
    from = from.startsWith("+") ? `whatsapp:${from}` : `whatsapp:+${from.replace(/^\+/, "")}`;
  }

  return client.messages.create({
    from,
    to,
    body: String(body || ""),
  });
}
