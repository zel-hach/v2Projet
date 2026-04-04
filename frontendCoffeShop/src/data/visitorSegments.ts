/** Valeur envoyée à l’API `GET /api/users?segment=…` */
export type VisitorListSegment = 'all' | 'investisseur' | 'etudiant';

/** Libellés affichés dans le formulaire (stockés dans `User.status`, comparaison insensible à la casse côté API). */
export const VISITOR_PROFILE_OPTIONS = [
  { value: 'Fonctionnaire', group: 'Investisseur' },
  { value: 'CTO', group: 'Investisseur' },
  { value: 'Entrepreneur', group: 'Investisseur' },
  { value: 'Titulaire', group: 'Étudiant' },
  { value: 'Étudiant', group: 'Étudiant' },
  { value: 'Autre', group: 'Autre' },
] as const;
