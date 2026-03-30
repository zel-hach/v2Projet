import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { coffeeUsers as users } from '../data/coffeeUsers';
import { adminProfile } from '../data/adminProfile';

const BodyDashboard = () => {
    const [search] = useState('');

    const servedUsers = useMemo(
        () =>
          users.filter(
            (user) =>
              user.status === 'Servi' &&
              (user.fullName.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()))
          ),
        [search]
      );

    const totalCups = servedUsers.reduce((sum, user) => sum + user.cupsToday, 0);
    const espressoUsers = servedUsers.filter((user) => user.coffeeType === 'Espresso').length;
    const cappuccinoUsers = servedUsers.filter((user) => user.coffeeType === 'Cappuccino').length;
    const latteUsers = servedUsers.filter((user) => user.coffeeType === 'Latte').length;

    const weeklyConsumption = [
        { day: 'Lun', cups: 6 },
        { day: 'Mar', cups: 9 },
        { day: 'Mer', cups: 7 },
        { day: 'Jeu', cups: 11 },
        { day: 'Ven', cups: 8 },
        { day: 'Sam', cups: 4 },
        { day: 'Dim', cups: 3 },
      ];
    const maxWeeklyCups = Math.max(...weeklyConsumption.map((item) => item.cups));
    const topCoffeeShare = servedUsers.length > 0 ? Math.round((latteUsers / servedUsers.length) * 100) : 0;

    const recentActivity = useMemo(
      () =>
        [...servedUsers]
          .filter((u) => u.lastCoffeeAt !== '-')
          .sort((a, b) => b.lastCoffeeAt.localeCompare(a.lastCoffeeAt))
          .slice(0, 5),
      [servedUsers]
    );

    const firstName = adminProfile.fullName.split(/\s+/)[0] ?? adminProfile.fullName;

    return (
        <section className="max-w-7xl mx-auto space-y-6 p-4 sm:p-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-orange-900 sm:text-2xl">
              Bonjour, {firstName}
            </h1>
            <p className="mt-1 text-sm text-orange-900/80">
              Vue d’ensemble de ton café — {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="utilisateurs"
              className="rounded-xl bg-[#FF5722] px-4 py-2.5 text-sm font-semibold text-[#121435] shadow-[0_8px_20px_rgba(255,87,34,0.3)] transition hover:bg-[#ff8d6a]"
            >
              Utilisateurs
            </Link>
            <Link
              to="rapports"
              className="rounded-xl border border-orange-900/30 px-4 py-2.5 text-sm font-medium text-orange-900 transition hover:bg-orange-900/10"
            >
              Rapports
            </Link>
            <Link
              to="parametres"
              className="rounded-xl border border-orange-900/30 px-4 py-2.5 text-sm font-medium text-orange-900 transition hover:bg-orange-900/10"
            >
              Paramètres
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
            <p className="text-orange-900 text-sm">Users servis</p>
            <p className="text-3xl font-bold text-[#FF5722] mt-2">{servedUsers.length}</p>
            <p className="text-xs text-orange-900/70 mt-2">+8% vs hier</p>
          </article>
          <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
            <p className="text-orange-900 text-sm">Tasses aujourd'hui</p>
            <p className="text-3xl font-bold text-[#FF5722] mt-2">{totalCups}</p>
            <p className="text-xs text-orange-900/70 mt-2">Pic a 10:00 - 11:00</p>
          </article>
          <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
            <p className="text-orange-900 text-sm">Type le plus demande</p>
            <p className="text-2xl font-bold text-[#FF5722] mt-2">Latte</p>
            <p className="text-xs text-orange-900/70 mt-2">{topCoffeeShare}% des commandes</p>
          </article>
          <article className="rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
            <p className="text-orange-900 text-sm">Satisfaction</p>
            <p className="text-3xl font-bold text-[#FF5722] mt-2">4.8/5</p>
            <p className="text-xs text-orange-900/70 mt-2">Basee sur 124 avis</p>
          </article>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <article className="lg:col-span-3 rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-orange-900">Consommation hebdomadaire</h2>
              <span className="text-xs text-orange-900/80">Tasses par jour</span>
            </div>

            <div className="flex items-end gap-3 h-56">
              {weeklyConsumption.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full rounded-md bg-white h-44 flex items-end overflow-hidden">
                    <div
                      className="w-full rounded-md bg-gradient-to-t from-[#FF5722] to-[#ff8d6a]"
                      style={{
                        height: `${(item.cups / maxWeeklyCups) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-orange-900/80">{item.day}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="lg:col-span-2 rounded-2xl border border-orange-900/20 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-orange-900">Repartition des cafes</h2>
              <span className="text-xs text-orange-900/80">Top des boissons</span>
            </div>

            <div className="space-y-4 mt-2">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Latte</span>
                  <span className="text-[#FF5722]">{latteUsers}</span>
                </div>
                <div className="h-2 rounded-full bg-[#121435]">
                  <div className="h-2 rounded-full bg-[#FF5722] w-[70%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Espresso</span>
                  <span className="text-[#FF5722]">{espressoUsers}</span>
                </div>
                <div className="h-2 rounded-full bg-[#121435]">
                  <div className="h-2 rounded-full bg-[#ff8d6a] w-[45%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Cappuccino</span>
                  <span className="text-[#FF5722]">{cappuccinoUsers}</span>
                </div>
                <div className="h-2 rounded-full bg-[#121435]">
                  <div className="h-2 rounded-full bg-[#ffc2ae] w-[35%]" />
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-lg bg-[#121435] p-2 text-center text-orange-900">Latte 70%</div>
              <div className="rounded-lg bg-[#121435] p-2 text-center text-orange-900">Esp 45%</div>
              <div className="rounded-lg bg-[#121435] p-2 text-center text-orange-900">Cap 35%</div>
            </div>
          </article>
        </section>

        <section className="rounded-2xl border border-orange-900/20 bg-[#0f112d] p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-orange-900">Activité récente</h2>
            <Link to="utilisateurs" className="text-xs font-medium text-[#FF5722] hover:underline">
              Voir tout
            </Link>
          </div>
          {recentActivity.length === 0 ? (
            <p className="text-sm text-orange-900/70">Aucune activité récente.</p>
          ) : (
            <ul className="divide-y divide-orange-900/10">
              {recentActivity.map((user) => (
                <li key={user.id} className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0">
                  <div>
                    <p className="font-medium text-orange-900">{user.fullName}</p>
                    <p className="text-xs text-orange-900/70">
                      {user.coffeeType} · {user.cupsToday} tasse{user.cupsToday > 1 ? 's' : ''}
                    </p>
                  </div>
                  <span className="rounded-lg bg-[#121435] px-2.5 py-1 text-xs text-orange-900">
                    Dernier café {user.lastCoffeeAt}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    );
}

export default BodyDashboard;
