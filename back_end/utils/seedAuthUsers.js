import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

function trimEnv(value) {
  return value != null ? String(value).trim() : "";
}

/**
 * Admin + viewer from .env:
 * - ADMIN_EMAIL / ADMIN_PASSWORD → full access (delete, update, …)
 * - USERS_EMAIL / USERS_PASSWORD (or legacy PASSWORD) → liste visiteurs, pas de suppression API
 */
export async function seedAuthUsers() {
  const viewerPassword =
    trimEnv(process.env.USERS_PASSWORD) || trimEnv(process.env.PASSWORD);

  const seeds = [
    {
      role: "admin",
      email: trimEnv(process.env.ADMIN_EMAIL),
      password: trimEnv(process.env.ADMIN_PASSWORD),
      first_name: "Admin",
      last_name: "Système",
      status: "admin",
    },
    {
      role: "viewer",
      email: trimEnv(process.env.USERS_EMAIL),
      password: viewerPassword,
      first_name: "Utilisateur",
      last_name: "Consultation",
      status: "viewer",
    },
  ];

  for (const s of seeds) {
    if (!s.email || !s.password) {
      const hint =
        s.role === "admin"
          ? "ADMIN_EMAIL / ADMIN_PASSWORD"
          : "USERS_EMAIL / USERS_PASSWORD (ou PASSWORD)";
      console.warn(`[seed] Ignoré (${s.role}): renseigner ${hint} dans .env`);
      continue;
    }

    const hash = await bcrypt.hash(s.password, 10);
    await User.findOneAndUpdate(
      { email: s.email.toLowerCase() },
      {
        $set: {
          email: s.email.toLowerCase(),
          password: hash,
          role: s.role,
          first_name: s.first_name,
          last_name: s.last_name,
          status: s.status,
        },
      },
      { upsert: true, new: true }
    );
    console.log(`[seed] Compte prêt: ${s.role} (${s.email})`);
  }
}
