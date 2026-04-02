import { Avatar, Badge, CopyButton, Group } from '@mantine/core';
import type { CoffeeUser } from '../../../data/coffeeUsers';
import { getUserId } from './userHelpers';

export function UserModalHeader({ user }: { user: CoffeeUser }) {
  const initials = `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase() || 'U';

  return (
    <Group justify="space-between" align="center">
      <Group gap="sm">
        <Avatar style={{ width: '3.5rem', height: '3.5rem' }} color="orange">
          {initials}
        </Avatar>
        <div>
          <div className="text-white font-semibold">
            {user.first_name} {user.last_name}
          </div>
          <div className="text-sm text-white/70">{user.email || '—'}</div>
        </div>
      </Group>
      <Badge color="orange" variant="light">
        {user.status || '—'}
      </Badge>
    </Group>
  );
}

function InfoCard({
  label,
  value,
  copyValue,
}: {
  label: string;
  value: string;
  copyValue?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/40 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-white/60">{label}</p>
        {copyValue ? (
          <CopyButton value={copyValue}>
            {({ copied, copy }) => (
              <button
                type="button"
                onClick={copy}
                className="text-xs font-semibold text-orange-200 hover:text-orange-100"
              >
                {copied ? 'Copié' : 'Copier'}
              </button>
            )}
          </CopyButton>
        ) : null}
      </div>
      <p className="text-sm text-white break-all">{value || '—'}</p>
    </div>
  );
}

export function UserInfoGrid({ user }: { user: CoffeeUser }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <InfoCard label="Email" value={user.email || '—'} copyValue={user.email || undefined} />
      <InfoCard label="Téléphone" value={user.phone || '—'} copyValue={user.phone || undefined} />
      <InfoCard label="Ville" value={user.city || '—'} />
      <InfoCard label="Type de café" value={user.coffeeType || '—'} />
      <InfoCard label="ID" value={String(getUserId(user) ?? '—')} />
    </div>
  );
}

