export const adminProfile = {
  fullName: 'Marie Dubois',
  email: 'marie.dubois@coffeeshop.local',
  role: 'Administrateur',
} as const;

export function getAdminInitials(fullName: string): string {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
