import { Avatar } from '@mantine/core';
import type { CoffeeUser } from '../../../data/coffeeUsers';
import { getUserRowKey } from './userHelpers';

type UsersTableProps = {
  users: CoffeeUser[];
  isLoading: boolean;
  onEdit: (user: CoffeeUser) => void;
  onWhatsApp: (user: CoffeeUser) => void;
  onDelete: (user: CoffeeUser) => void;
};

export function UsersTable({
  users,
  isLoading,
  onEdit,
  onWhatsApp,
  onDelete,
}: UsersTableProps) {
  const rowBase = 'group transition-colors border-b border-orange-900/10';
  const rowEven = 'bg-white';
  const rowOdd = 'bg-orange-200/50';
  const cellBase = 'px-6 py-6 align-middle text-sm text-slate-800';
  const cellLeft = `${cellBase} text-left`;
  const cellCenter = `${cellBase} text-center`;
  const cellBgHover = 'group-hover:!bg-orange-50/70';

  return (
    <div className="max-h-[790px] w-full overflow-y-auto no-scrollbar rounded-xl border border-[#e2e8f0]">
      <table className="w-full border-separate border-spacing-0">
        <thead className="bg-[#f8fafc] sticky top-0 z-20 shadow-sm">
          <tr>
            <th className="text-left px-6 py-5 text-sm font-semibold text-[#475569]">Nom</th>
            <th className="text-left px-6 py-5 text-sm font-semibold text-[#475569]">Email</th>
            <th className="text-center px-6 py-5 text-sm font-semibold text-[#475569]">Numero de telephone</th>
            <th className="text-center px-6 py-5 text-sm font-semibold text-[#475569]">Type de café</th>
            <th className="text-center px-6 py-5 text-sm font-semibold text-[#475569]">Statut</th>
            <th className="text-center px-6 py-5 text-sm font-semibold text-[#475569]">Action</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr className={rowBase}>
              <td colSpan={6} className="text-center py-10 text-[#f68716]">
                Chargement...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr className={rowBase}>
              <td colSpan={6} className="text-center py-12 text-[#94a3b8]">
                Aucun utilisateur trouvé
              </td>
            </tr>
          ) : (
            users.map((user, index) => {
              const rowBg = index % 2 === 0 ? rowEven : rowOdd;
              const tdLeft = `${cellLeft} ${rowBg} ${cellBgHover}`;
              const tdCenter = `${cellCenter} ${rowBg} ${cellBgHover}`;

              return (
                <tr key={getUserRowKey(user)} className={rowBase}>
                  <td className={tdLeft}>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">
                          {user.first_name} {user.last_name}
                        </span>
                        <span className="text-xs text-slate-500">{user.city || ''}</span>
                      </div>
                    </div>
                  </td>

                  <td className={tdLeft}>{user.email}</td>
                  <td className={tdCenter}>{user.phone || '+212600000000'}</td>
                  <td className={tdCenter}>{user.coffeeType || 'Espresso'}</td>
                  <td className={tdCenter}>
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {user.status || 'Servi'}
                    </span>
                  </td>
                  <td className={tdCenter}>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <button
                        type="button"
                        className="px-3 py-1.5 text-xs font-semibold rounded-md bg-blue-50 text-blue-600 ring-1 ring-blue-200 hover:bg-blue-100 transition"
                        onClick={() => onEdit(user)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="px-3 py-1.5 text-xs font-semibold rounded-md bg-orange-50 text-orange-600 ring-1 ring-orange-200 hover:bg-orange-100 transition"
                        onClick={() => onWhatsApp(user)}
                      >
                        Envoyer
                      </button>

                      <button
                        type="button"
                        className="px-3 py-1.5 text-xs font-semibold rounded-md bg-red-50 text-red-600 ring-1 ring-red-200 hover:bg-red-100 transition"
                        onClick={() => onDelete(user)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
