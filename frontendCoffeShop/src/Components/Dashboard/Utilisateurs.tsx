import { useMemo, useState } from 'react';
import { coffeeUsers } from '../../data/coffeeUsers';

const Utilisateurs = () => {
  const [search, setSearch] = useState('');

  const servedUsers = useMemo(
    () =>
      coffeeUsers.filter(
        (user) =>
          user.status === 'Servi' &&
          (user.fullName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()))
      ),
    [search]
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Utilisateurs</h1>
          <p className="mt-1 text-sm text-black/75">Clients au statut « Servi »</p>
        </div>
        <label className="block w-full sm:max-w-xs">
          <span className="sr-only">Rechercher</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou email…"
            className="w-full rounded-xl border border-[#f68716]/20 bg-white px-4 py-2.5 text-black placeholder:text-black/45 outline-none focus:border-[#f68716]/50 focus:ring-2 focus:ring-[#f68716]/20"
          />
        </label>
      </div>

      <section className="overflow-hidden rounded-2xl border border-[#f68716]/20 bg-white shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
        <div className="flex items-center justify-between border-b border-[#f68716]/15 px-4 py-4">
          <h2 className="font-semibold text-black">Liste des utilisateurs servis</h2>
          <span className="text-xs text-black/75">{servedUsers.length} résultat(s)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-black left">
            <thead className="bg-[#f68716]/10 text-black">
              <tr>
                <th className="px-4 py-3 font-semibold">Nom</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Café</th>
                <th className="px-4 py-3 font-semibold">Tasses</th>
                <th className="px-4 py-3 font-semibold">Dernier café</th>
                <th className="px-4 py-3 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody>
              {servedUsers.map((user) => (
                <tr key={user.id} className="border-t border-[#f68716]/15 transition hover:bg-[#f68716]/10">
                  <td className="px-4 py-3">{user.fullName}</td>
                  <td className="px-4 py-3 text-black">{user.email}</td>
                  <td className="px-4 py-3">{user.coffeeType}</td>
                  <td className="px-4 py-3">{user.cupsToday}</td>
                  <td className="px-4 py-3">{user.lastCoffeeAt}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#f68716]/20 px-3 py-1 text-xs font-semibold text-black">
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Utilisateurs;
