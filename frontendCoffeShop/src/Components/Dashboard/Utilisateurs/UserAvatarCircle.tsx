import { mediaAbsoluteUrl } from '../../../data/usersApi';
import { getUserInitials } from './userHelpers';

function resolveAvatarSrc(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('blob:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return mediaAbsoluteUrl(url);
}

type UserAvatarCircleProps = {
  imageUrl?: string | null;
  firstName?: string;
  lastName?: string;
  /** Classes Tailwind pour la taille, ex. `size-10` ou `h-40 w-40` */
  className?: string;
  /** Initiales plus petites sur grand cercle */
  initialsClassName?: string;
};

export function UserAvatarCircle({
  imageUrl,
  firstName,
  lastName,
  className = 'size-16',
  initialsClassName = 'text-sm',
}: UserAvatarCircleProps) {
  const src = resolveAvatarSrc(imageUrl ?? null);
  const initials = getUserInitials(firstName, lastName);

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-100 ring-1 ring-orange-200/70 ${className}`}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <span className={`font-bold uppercase text-orange-800 ${initialsClassName}`}>{initials}</span>
      )}
    </div>
  );
}
