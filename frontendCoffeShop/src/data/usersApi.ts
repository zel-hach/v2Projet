import { API_BASE_URL } from './apiConfig';

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function updateUser(id: string | number, formData: FormData): Promise<unknown> {
  const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const raw = (data as { message?: string }).message || '';
    const lower = raw.toLowerCase();
    if (
      res.status === 413 ||
      lower.includes('too large') ||
      lower.includes('file too large') ||
      lower.includes('limit')
    ) {
      throw new Error(
        'La vidéo est trop volumineuse (maximum 3 Go). Réduisez la taille du fichier.'
      );
    }
    throw new Error(raw || `Erreur ${res.status}`);
  }
  return data;
}

export function mediaAbsoluteUrl(relativeOrAbsolute: string | undefined | null): string | null {
  if (!relativeOrAbsolute) return null;
  if (relativeOrAbsolute.startsWith('http')) return relativeOrAbsolute;
  return `${API_BASE_URL}${relativeOrAbsolute.startsWith('/') ? '' : '/'}${relativeOrAbsolute}`;
}
