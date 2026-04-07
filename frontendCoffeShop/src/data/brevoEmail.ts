/** API transactionnelle Brevo (HTTPS). La clé est lue côté client si vous utilisez VITE_* — en production, préférez un endpoint serveur. */
const BREVO_SMTP_EMAIL_URL = 'https://api.brevo.com/v3/smtp/email';

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildVisitorEmailBodies(
  message: string,
  imageUrl: string | null,
  videoUrl: string | null
): { htmlContent: string; textContent: string } {
  const safeText = String(message || '').trim();
  let text = safeText;
  if (imageUrl) text += `\n\nPhoto : ${imageUrl}`;
  if (videoUrl) text += `\n\nVidéo : ${videoUrl}`;

  const htmlBody = escapeHtml(safeText).replace(/\n/g, '<br/>');
  let extras = '';
  if (imageUrl) {
    const u = escapeHtml(imageUrl);
    extras += `<p><strong>Photo :</strong> <a href="${u}">${u}</a></p>`;
  }
  if (videoUrl) {
    const u = escapeHtml(videoUrl);
    extras += `<p><strong>Vidéo :</strong> <a href="${u}">${u}</a></p>`;
  }
  const htmlContent = `<!DOCTYPE html><html><body><div>${htmlBody}</div>${extras}</body></html>`;
  return { htmlContent, textContent: text };
}

export function isBrevoConfigured(): boolean {
  const key = String(import.meta.env.VITE_BREVO_API_KEY ?? '').trim();
  const sender = String(import.meta.env.VITE_BREVO_SENDER_EMAIL ?? '').trim();
  return Boolean(key && sender);
}

export async function sendEmailViaBrevo(params: {
  to: string;
  subject: string;
  htmlContent: string;
  textContent: string;
}): Promise<void> {
  const apiKey = String(import.meta.env.VITE_BREVO_API_KEY ?? '').trim();
  const senderEmail = String(import.meta.env.VITE_BREVO_SENDER_EMAIL ?? '').trim();
  const senderName =
    String(import.meta.env.VITE_BREVO_SENDER_NAME ?? '').trim() || 'CoffeeShop';

  if (!apiKey || !senderEmail) {
    throw new Error('Brevo : renseignez VITE_BREVO_API_KEY et VITE_BREVO_SENDER_EMAIL dans .env');
  }

  console.log(apiKey, senderEmail, senderName);
  const res = await fetch(BREVO_SMTP_EMAIL_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: params.to.trim() }],
      subject: params.subject,
      htmlContent: params.htmlContent,
      textContent: params.textContent,
    }),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    const msg = typeof data.message === 'string' ? data.message : (await res.text().catch(() => ''));
    throw new Error(msg.trim() || `Brevo a répondu ${res.status}`);
  }
}
