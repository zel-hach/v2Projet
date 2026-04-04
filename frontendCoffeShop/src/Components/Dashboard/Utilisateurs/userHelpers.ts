import type { CoffeeUser } from '../../../data/coffeeUsers';

export function getUserId(user: CoffeeUser): string | number | undefined {
  const anyUser = user as unknown as { _id?: string; id?: number | string };
  return anyUser._id ?? anyUser.id;
}

export function getUserRowKey(user: CoffeeUser): string | number {
  const id = getUserId(user);
  if (id !== undefined && id !== null) return id;
  return `${user.email}-${user.first_name}`;
}

export function normalizePhoneForWhatsApp(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

/** Initiales : 1ʳᵉ lettre du prénom + 1ʳᵉ lettre du nom (ou une seule lettre / « ? »). */
export function getUserInitials(firstName?: string, lastName?: string): string {
  const a = (firstName ?? '').trim().charAt(0);
  const b = (lastName ?? '').trim().charAt(0);
  let s = '';
  if (a) s += a.toUpperCase();
  if (b) s += b.toUpperCase();
  return s || '?';
}
