import { useEffect, useMemo, useState } from 'react';
import { fetchUsers, type CoffeeUser } from '../data/coffeeUsers';
import { fetchDashboardStats, type DashboardStats } from '../data/dashboardApi';
import { getSessionShortName } from '../data/sessionUser';

const BodyDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [coffeeUsers, setCoffeeUsers] = useState<CoffeeUser[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [s, users] = await Promise.all([fetchDashboardStats(), fetchUsers()]);
      if (!cancelled) {
        setStats(s);
        setCoffeeUsers(users);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const espressoUsers = useMemo(
    () => coffeeUsers.filter((u) => (u.coffeeType || '').toLowerCase() === 'espresso').length,
    [coffeeUsers]
  );
  const cappuccinoUsers = useMemo(
    () => coffeeUsers.filter((u) => (u.coffeeType || '').toLowerCase() === 'cappuccino').length,
    [coffeeUsers]
  );
  const latteUsers = useMemo(
    () => coffeeUsers.filter((u) => (u.coffeeType || '').toLowerCase() === 'latte').length,
    [coffeeUsers]
  );

  const maxTypeCount = Math.max(espressoUsers, cappuccinoUsers, latteUsers, 1);
  const totalTyped = espressoUsers + cappuccinoUsers + latteUsers;
  const topCoffeeShare =
    totalTyped > 0 ? Math.round((Math.max(espressoUsers, cappuccinoUsers, latteUsers) / totalTyped) * 100) : 0;

  const cupsByDay = stats?.cupsByDay ?? [];
  const maxWeeklyCups = Math.max(1, ...cupsByDay.map((d) => d.cups));

  const todayCups = cupsByDay.length > 0 ? cupsByDay[cupsByDay.length - 1].cups : 0;

  const firstName = getSessionShortName();

  const investisseurCount = stats?.investisseurCount ?? '—';
  const etudiantCount = stats?.etudiantCount ?? '—';
  const visiteurCount = stats?.visiteurCount ?? '—';
  const totalCups = stats?.totalCups ?? '—';

  return (
    <section className="w-full min-h-screen overflow-x-hidden space-y-6 p-4 sm:p-8 lg:ml-64">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
          <h1 className="mt-1 text-lg text-orange-900/70">Bonjour, {firstName}</h1>
        </div>    
      </div>
      <div className="w-full h-1 bg-orange-900/20" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
          <p className="text-orange-900 text-sm">Investisseurs</p>
          <p className="text-3xl font-bold text-[#FF5722] mt-2">{investisseurCount}</p>
          <p className="text-xs text-orange-900/70 mt-2">Fonctionnaire, CTO, entrepreneur</p>
        </article>
        <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
          <p className="text-orange-900 text-sm">Étudiants</p>
          <p className="text-3xl font-bold text-[#FF5722] mt-2">{etudiantCount}</p>
          <p className="text-xs text-orange-900/70 mt-2">Titulaire, étudiant</p>
        </article>
        <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
          <p className="text-orange-900 text-sm">Visiteurs</p>
          <p className="text-3xl font-bold text-[#FF5722] mt-2">{visiteurCount}</p>
          <p className="text-xs text-orange-900/70 mt-2">Tous profils (hors comptes admin)</p>
        </article>
        <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
          <p className="text-orange-900 text-sm">Total tasses</p>
          <p className="text-3xl font-bold text-[#FF5722] mt-2">{totalCups}</p>
          <p className="text-xs text-orange-900/70 mt-2">Somme sur les 7 derniers jours</p>
        </article>
        <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
          <p className="text-orange-900 text-sm">Tasses aujourd’hui</p>
          <p className="text-3xl font-bold text-[#FF5722] mt-2">{stats ? todayCups : '—'}</p>
          <p className="text-xs text-orange-900/70 mt-2">Somme des « tasses » par visiteur</p>
        </article>
      </div>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:h-[600px] lg:items-stretch">
        <article className="flex min-h-[320px] flex-col rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)] lg:col-span-3 lg:h-full lg:min-h-0">
          <div className="flex shrink-0 items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-orange-900">Tasses par jour</h2>
            <span className="text-xs text-orange-900/80">7 derniers jours</span>
          </div>

          <div className="mt-4 flex min-h-0 flex-1 flex-col">
            {cupsByDay.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-orange-900/60">Chargement des statistiques…</p>
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 items-stretch gap-2 sm:gap-3">
                {cupsByDay.map((item) => (
                  <div
                    key={item.dayKey}
                    className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div className="flex min-h-[120px] w-full flex-1 flex-col justify-end rounded-md border border-orange-900/10 bg-orange-50/40">
                      <div
                        className="w-full rounded-md bg-gradient-to-t from-[#FF5722] to-[#ff8d6a] transition-all"
                        style={{
                          height: `${(item.cups / maxWeeklyCups) * 100}%`,
                          minHeight: item.cups > 0 ? '6px' : '0',
                        }}
                        title={`${item.dayKey}: ${item.cups}`}
                      />
                    </div>
                    <span className="shrink-0 text-center text-[10px] leading-tight text-orange-900/80 sm:text-xs">
                      {item.label}
                    </span>
                    <span className="shrink-0 text-[10px] font-semibold text-[#FF5722]">{item.cups}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>

        <article className="flex min-h-[280px] flex-col rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)] lg:col-span-2 lg:h-full lg:min-h-0">
          <div className="flex shrink-0 items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-orange-900">Répartition des cafés</h2>
            <span className="text-xs text-orange-900/80">Par type déclaré</span>
          </div>

          <div className="mt-4 flex min-h-0 flex-1 flex-col justify-center gap-6">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Latte</span>
                <span className="text-[#FF5722]">{latteUsers}</span>
              </div>
              <div className="h-2 rounded-full bg-[#121435]/15">
                <div
                  className="h-2 rounded-full bg-[#FF5722]"
                  style={{ width: `${(latteUsers / maxTypeCount) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Espresso</span>
                <span className="text-[#FF5722]">{espressoUsers}</span>
              </div>
              <div className="h-2 rounded-full bg-[#121435]/15">
                <div
                  className="h-2 rounded-full bg-[#ff8d6a]"
                  style={{ width: `${(espressoUsers / maxTypeCount) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Cappuccino</span>
                <span className="text-[#FF5722]">{cappuccinoUsers}</span>
              </div>
              <div className="h-2 rounded-full bg-[#121435]/15">
                <div
                  className="h-2 rounded-full bg-[#ffc2ae]"
                  style={{ width: `${(cappuccinoUsers / maxTypeCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <p className="mt-auto shrink-0 border-t border-orange-900/10 pt-4 text-xs text-orange-900/70">
            Part du type le plus fréquent : {topCoffeeShare}% (sur visiteurs avec type renseigné)
          </p>
        </article>
      </section>
    </section>
  );
};

export default BodyDashboard;
