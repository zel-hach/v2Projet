import { Resend } from "resend";

function escapeHtml(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** N’autorise que http(s) pour éviter javascript: dans le HTML mail. */
function safeMediaUrl(url) {
  if (!url || typeof url !== "string") return "";
  try {
    const u = new URL(url.trim());
    if (u.protocol === "http:" || u.protocol === "https:") return u.href;
  } catch {
    /* ignore */
  }
  return "";
}

/**
 * POST body: { to, message, imageUrl?, videoUrl? }
 * Envoie un e-mail au visiteur avec le texte + aperçu image + lien / balise vidéo si fournis.
 */
export async function postSendUserEmail(req, res) {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const from = process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";

    if (!apiKey) {
      return res.status(503).json({ message: "RESEND_API_KEY manquant dans .env" });
    }

    const { to, message, imageUrl, videoUrl } = req.body || {};
    const emailTo = String(to || "").trim();
    const text = String(message || "").trim();

    if (!emailTo || !text) {
      return res.status(400).json({ message: "E-mail du destinataire et message sont requis" });
    }

    const safeImg = safeMediaUrl(imageUrl);
    const safeVid = safeMediaUrl(videoUrl);

    const bodyHtml = escapeHtml(text).replace(/\n/g, "<br/>");

    let mediaBlock = "";
    if (safeImg) {
      mediaBlock += `<p style="margin:16px 0;"><img src="${safeImg}" alt="Image" style="max-width:100%;height:auto;border-radius:8px;border:1px solid #eee;" /></p>`;
    }
    if (safeVid) {
      mediaBlock += `<p style="margin:16px 0;"><strong>Vidéo :</strong> <a href="${safeVid}">Ouvrir / télécharger la vidéo</a></p>`;
      mediaBlock += `<p style="margin:16px 0;"><video controls width="100%" style="max-width:560px;border-radius:8px;" src="${safeVid}"></video></p>`;
    }

    const html = `
      <div style="font-family:system-ui,sans-serif;color:#111;line-height:1.5;">
        <p>${bodyHtml}</p>
        ${mediaBlock}
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="font-size:12px;color:#666;">Message envoyé depuis l’espace administration Coffee Shop.</p>
      </div>
    `;

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: emailTo,
      subject: process.env.RESEND_SUBJECT?.trim() || "Message de l’administrateur — Coffee Shop",
      html,
    });

    if (result.error) {
      return res.status(500).json({ message: result.error.message || "Erreur Resend" });
    }

    return res.status(200).json({ message: "E-mail envoyé", id: result.data?.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Erreur envoi e-mail" });
  }
}
