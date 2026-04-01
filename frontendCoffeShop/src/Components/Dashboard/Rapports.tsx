import { useEffect, useMemo, useState } from 'react';
import { fetchUsers, type CoffeeUser } from '../../data/coffeeUsers';

const weeklyConsumption = [
  { day: 'Lun', cups: 6 },
  { day: 'Mar', cups: 9 },
  { day: 'Mer', cups: 7 },
  { day: 'Jeu', cups: 11 },
  { day: 'Ven', cups: 8 },
  { day: 'Sam', cups: 4 },
  { day: 'Dim', cups: 3 },
];

const Rapports = () => {
  const [period, setPeriod] = useState<'7j' | '30j' | 'mois'>('7j');
  const [exportHint, setExportHint] = useState<string | null>(null);
  const [coffeeUsers, setCoffeeUsers] = useState<CoffeeUser[]>([]);

  useEffect(() => {
    fetchUsers().then(setCoffeeUsers);
  }, []);
  
  const servedUsers = useMemo(
    () => coffeeUsers.filter((u) => u.status === 'Servi'),
    []
  );

  const totalCups = useMemo(
    () => servedUsers.reduce((sum, u) => sum + Number(u.cupsToday), 0),
    [servedUsers]
  );

  const byCoffeeType = useMemo(() => {
    const map = new Map<string, { clients: number; tasses: number }>();
    for (const u of servedUsers) {
      const cur = map.get(u.coffeeType) ?? { clients: 0, tasses: 0 };
      map.set(u.coffeeType, {
        clients: cur.clients + 1,
        tasses: cur.tasses + Number(u.cupsToday),
      });
    }
    return [...map.entries()]
      .map(([type, v]) => ({ type, ...v }))
      .sort((a, b) => b.tasses - a.tasses);
  }, [servedUsers]);

  const maxWeeklyCups = Math.max(...weeklyConsumption.map((d) => d.cups));
  const avgCupsPerClient =
    servedUsers.length > 0 ? (totalCups / servedUsers.length).toFixed(1) : '—';

  const periodLabel =
    period === '7j' ? '7 derniers jours' : period === '30j' ? '30 derniers jours' : 'Mois en cours';

  const showExportMsg = (label: string) => {
    setExportHint(`${label} — bientôt connecté à l’API.`);
    window.setTimeout(() => setExportHint(null), 3500);
  };

  return (
    <section className="w-full min-h-screen overflow-x-hidden space-y-6 p-4 sm:p-8 lg:ml-64">    
    <div className="flex flex-col gap-4 rounded-2xl border border-orange-900/20 bg-white text-black p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)] sm:flex-row sm:items-center sm:justify-between">
         
        <div>
          <h1 className="text-black 2xl font-semibold text-black orange-900">Rapports</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: '7j' as const, label: '7 jours' },
              { id: '30j' as const, label: '30 jours' },
              { id: 'mois' as const, label: 'Mois' },
            ]
          ).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setPeriod(id)}
              className={`rounded-xl px-4 py-2 text-black sm font-medium transition ${
                period === id
                  ? 'bg-[#FF5722]/25 text-black [#FF5722] ring-1 ring-[#FF5722]/40'
                  : 'border border-orange-900/20 text-black orange-900 hover:bg-orange-900/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {exportHint ? (
        <p className="rounded-xl border border-[#FF5722]/30 bg-[#FF5722]/10 px-4 py-3 text-black sm text-black orange-900">
          {exportHint}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
          <p className="text-black sm text-black orange-900">Tasses (période)</p>
          <p className="mt-2 text-black 3xl font-bold text-black [#FF5722]">{totalCups}</p>
          <p className="mt-2 text-black xs text-black orange-900/70">Données démo basées sur les clients servis</p>
        </article>
        <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
          <p className="text-black sm text-black orange-900">Clients servis</p>
          <p className="mt-2 text-black 3xl font-bold text-black [#FF5722]">{servedUsers.length}</p>
          <p className="mt-2 text-black xs text-black orange-900/70">Actifs sur la sélection</p>
        </article>
        <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
          <p className="text-black sm text-black orange-900">Moy. tasses / client</p>
          <p className="mt-2 text-black 3xl font-bold text-black [#FF5722]">{avgCupsPerClient}</p>
          <p className="mt-2 text-black xs text-black orange-900/70">Aujourd&apos;hui (jeu de données)</p>
        </article>
        <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
          <p className="text-black sm text-black orange-900">Pic semaine</p>
          <p className="mt-2 text-black 2xl font-bold text-black [#FF5722]">{maxWeeklyCups} tasses</p>
          <p className="mt-2 text-black xs text-black orange-900/70">Jour le plus chargé (aperçu hebdo)</p>
        </article>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)] lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-black lg font-semibold text-black orange-900">Consommation hebdomadaire</h2>
            <span className="text-black xs text-black orange-900/80">Tasses / jour</span>
          </div>
          <div className="flex h-56 items-end gap-3">
            {weeklyConsumption.map((item) => (
              <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-44 w-full items-end overflow-hidden rounded-md bg-white">
                  <div
                    className="w-full rounded-md bg-gradient-to-t from-[#FF5722] to-[#ff8d6a]"
                    style={{ height: `${(item.cups / maxWeeklyCups) * 100}%` }}
                  />
                </div>
                <span className="text-black xs text-black orange-900/80">{item.day}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)] lg:col-span-2">
          <h2 className="mb-4 text-black lg font-semibold text-black orange-900">Exports</h2>
          <p className="mb-4 text-black sm text-black orange-900/75">
            Génère un fichier pour comptabilité ou analyse externe.
          </p>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => showExportMsg('Export CSV')}
              className="rounded-xl bg-[#FF5722] px-4 py-3 text-black sm font-semibold text-black transition hover:bg-[#ff8d6a]"
            >
              Télécharger CSV (synthèse)
            </button>
            <button
              type="button"
              onClick={() => showExportMsg('Export PDF')}
              className="rounded-xl border border-orange-900/30 px-4 py-3 text-black sm font-medium text-black orange-900 transition hover:bg-orange-900/10"
            >
              Exporter PDF (rapport visuel)
            </button>
          </div>
        </article>
      </div>

      <section className="overflow-hidden rounded-2xl border border-orange-900/20 bg-white shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
        <div className="flex items-center justify-between border-b border-orange-900/15 px-4 py-4">
          <h2 className="font-semibold text-black orange-900">Détail par type de boisson</h2>
          <span className="text-black xs text-black orange-900/75">{byCoffeeType.length} type(s)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-black left">
            <thead className="bg-[#FF5722]/15 text-black orange-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Boisson</th>
                <th className="px-4 py-3 font-semibold">Clients</th>
                <th className="px-4 py-3 font-semibold">Tasses cumulées</th>
                <th className="px-4 py-3 font-semibold">Part des tasses</th>
              </tr>
            </thead>
            <tbody>
              {byCoffeeType.map((row) => {
                const share = totalCups > 0 ? Math.round((row.tasses / totalCups) * 100) : 0;
                return (
                  <tr key={row.type} className="border-t border-orange-900/15 transition hover:bg-[#121435]/80">
                    <td className="px-4 py-3 font-medium text-black orange-900">{row.type}</td>
                    <td className="px-4 py-3 text-black orange-900">{row.clients}</td>
                    <td className="px-4 py-3">{row.tasses}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-2 flex-1 max-w-[120px] rounded-full bg-[#121435]">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-[#FF5722] to-[#ff8d6a]"
                            style={{ width: `${share}%` }}
                          />
                        </div>
                        <span className="text-black sm text-black orange-900">{share}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default Rapports;
