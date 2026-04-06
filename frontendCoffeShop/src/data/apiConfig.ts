function normalizeBaseUrl(raw: string | undefined): string | undefined {
  if (!raw || !String(raw).trim()) return undefined;
  return String(raw).trim().replace(/\/$/, '');
}

/** Sous-chemin API (ex. `/express-ai-sdk`) sans slash final. */
function normalizePathPrefix(raw: string | undefined): string {
  if (!raw || !String(raw).trim()) return '';
  let p = String(raw).trim();
  if (!p.startsWith('/')) p = `/${p}`;
  return p.replace(/\/$/, '') || '';
}

/**
 * Base du backend (sans slash final).
 *
 * - `VITE_API_URL` : origine seule (`https://mon-app.vercel.app`) ou déjà avec chemin
 *   (`https://mon-app.vercel.app/express-ai-sdk`).
 * - `VITE_API_PATH_PREFIX` (optionnel) : ajouté à l’origine si l’API est sous un préfixe
 *   (ex. reverse proxy ou déploiement sous `/express-ai-sdk`). Ignoré si `VITE_API_URL`
 *   se termine déjà par ce préfixe (évite le doublon).
 *
 * Alias : `VITE_BACKEND_URL` (même rôle que `VITE_API_URL` pour l’origine).
 */
const fromEnv =
  normalizeBaseUrl(import.meta.env.VITE_API_URL as string | undefined) ||
  normalizeBaseUrl(import.meta.env.VITE_BACKEND_URL as string | undefined);

const hostBase = fromEnv || 'http://localhost:7000';

const pathPrefix = normalizePathPrefix(import.meta.env.VITE_API_PATH_PREFIX as string | undefined);

export const API_BASE_URL =
  pathPrefix && !hostBase.endsWith(pathPrefix) ? `${hostBase}${pathPrefix}` : hostBase;
