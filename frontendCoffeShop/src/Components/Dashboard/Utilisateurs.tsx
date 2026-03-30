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
          <h1 className="text-black 2xl font-semibold text-black orange-900">Utilisateurs</h1>
          <p className="mt-1 text-black sm text-black orange-900/75">Clients au statut « Servi »</p>
        </div>
        <label className="block w-full sm:max-w-xs">
          <span className="sr-only">Rechercher</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou email…"
            className="w-full rounded-xl border border-orange-900/20 bg-[#0f112d] px-4 py-2.5 text-black sm text-black orange-900 placeholder:text-black orange-900/45 outline-none focus:border-[#FF5722]/50 focus:ring-2 focus:ring-[#FF5722]/20"
          />
        </label>
      </div>

      <section className="overflow-hidden rounded-2xl border border-orange-900/20 bg-[#0f112d] shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
        <div className="flex items-center justify-between border-b border-orange-900/15 px-4 py-4">
          <h2 className="font-semibold text-black orange-900">Liste des utilisateurs servis</h2>
          <span className="text-black xs text-black orange-900/75">{servedUsers.length} résultat(s)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-black left">
            <thead className="bg-[#FF5722]/15 text-black orange-900">
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
                <tr key={user.id} className="border-t border-orange-900/15 transition hover:bg-[#121435]/80">
                  <td className="px-4 py-3">{user.fullName}</td>
                  <td className="px-4 py-3 text-black orange-900">{user.email}</td>
                  <td className="px-4 py-3">{user.coffeeType}</td>
                  <td className="px-4 py-3">{user.cupsToday}</td>
                  <td className="px-4 py-3">{user.lastCoffeeAt}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#FF5722]/20 px-3 py-1 text-black xs font-semibold text-black [#FF5722]">
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
