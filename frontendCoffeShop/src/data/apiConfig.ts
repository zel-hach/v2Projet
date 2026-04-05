function normalizeBaseUrl(raw: string | undefined): string | undefined {
  if (!raw || !String(raw).trim()) return undefined;
  return String(raw).trim().replace(/\/$/, '');
}

/**
 * Base URL du backend (sans slash final).
 * Définir dans `.env` : `VITE_API_URL` ou `VITE_BACKEND_URL` (Vite n’expose que les variables préfixées par `VITE_`).
 */
const fromEnv =
  normalizeBaseUrl(import.meta.env.VITE_API_URL as string | undefined) ||
  normalizeBaseUrl(import.meta.env.VITE_BACKEND_URL as string | undefined);

export const API_BASE_URL = fromEnv || 'http://localhost:7000';
