const K = {
  first: 'userFirstName',
  last: 'userLastName',
  email: 'userEmail',
  role: 'userRole',
} as const;

export type LoginProfilePayload = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  role?: string | null;
};

/** À appeler après un login réussi (avec la réponse API). */
export function persistSessionFromLogin(data: LoginProfilePayload) {
  localStorage.setItem(K.first, (data.first_name ?? '').trim());
  localStorage.setItem(K.last, (data.last_name ?? '').trim());
  if (data.email) {
    localStorage.setItem(K.email, data.email.trim());
  }
  if (data.role) {
    localStorage.setItem(K.role, data.role);
  }
}

export function clearAuthSession() {
  localStorage.removeItem('token');
  localStorage.removeItem(K.role);
  localStorage.removeItem(K.first);
  localStorage.removeItem(K.last);
  localStorage.removeItem(K.email);
}

/** Nom complet ou email si pas de nom. */
export function getSessionDisplayName(): string {
  const full = `${localStorage.getItem(K.first) ?? ''} ${localStorage.getItem(K.last) ?? ''}`.trim();
  if (full.length > 0) return full;
  return localStorage.getItem(K.email) ?? 'Utilisateur';
}

/** Prénom ou première partie du nom affiché (ex. en-tête mobile). */
export function getSessionShortName(): string {
  const first = (localStorage.getItem(K.first) ?? '').trim();
  if (first) return first;
  const full = getSessionDisplayName();
  return full.split(/\s+/)[0] || 'Utilisateur';
}

/** Libellé lisible pour le rôle technique. */
export function getSessionRoleLabel(): string {
  const r = localStorage.getItem(K.role);
  if (r === 'admin') return 'Administrateur';
  if (r === 'viewer') return 'Consultation';
  return r ?? '';
}
