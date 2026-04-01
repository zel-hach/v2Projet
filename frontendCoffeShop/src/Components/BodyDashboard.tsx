import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {  fetchUsers, type CoffeeUser } from '../data/coffeeUsers';
import { adminProfile } from '../data/adminProfile';

const BodyDashboard = () => {
    const [search] = useState('');
    const [coffeeUsers, setCoffeeUsers] = useState<CoffeeUser[]>([]);

    useEffect(() => {
      fetchUsers().then(setCoffeeUsers);
    }, []); 
    const servedUsers = useMemo(
        () =>
          coffeeUsers.filter(
            (user) =>
              user.status === 'Servi' &&
              (user.first_name.toLowerCase().includes(search.toLowerCase()) ||
                user.last_name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()))
          ),
        [search]
      );

    const totalCups = servedUsers.reduce((sum, user) => sum + Number(user.cupsToday), 0);
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

   
    const firstName = adminProfile.fullName.split(/\s+/)[0] ?? adminProfile.fullName;

    return (
<section className="w-full min-h-screen overflow-x-hidden space-y-6 p-4 sm:p-8 lg:ml-64">    
      <div className="flex flex-col gap-4 rounded-2xl border border-orange-900/20 bg-white text-black p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)] sm:flex-row sm:items-center sm:justify-between">
        <div>
                  <h1 className="text-xl font-semibold text-black sm:text-2xl">
                    Bonjour, {firstName}
                  </h1>
                  
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
            <div className="flex flex-wrap gap-2">
              <Link
                to="utilisateurs"
                className="rounded-xl bg-[#f68716] px-4 py-2.5 text-sm font-semibold text-black shadow-[0_8px_20px_rgba(246,135,22,0.25)] transition hover:bg-[#f68716]/90"
              >
                Utilisateurs
              </Link>
              <Link
                to="rapports"
                className="rounded-xl border border-[#f68716]/30 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#f68716]/10"
              >
                Rapports
              </Link>
              <Link
                to="parametres"
                className="rounded-xl border border-[#f68716]/30 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#f68716]/10"
              >
                Paramètres
              </Link>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
              <p className="text-black text-sm">Users servis</p>
              <p className="text-3xl font-bold text-black mt-2">{servedUsers.length}</p>
              <p className="text-xs text-black/70 mt-2">+8% vs hier</p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
              <p className="text-black text-sm">Tasses aujourd'hui</p>
              <p className="text-3xl font-bold text-black mt-2">{totalCups}</p>
              <p className="text-xs text-black/70 mt-2">Pic a 10:00 - 11:00</p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
              <p className="text-black text-sm">Type le plus demande</p>
              <p className="text-2xl font-bold text-black mt-2">Latte</p>
              <p className="text-xs text-black/70 mt-2">{topCoffeeShare}% des commandes</p>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
              <p className="text-black text-sm">Satisfaction</p>
              <p className="text-3xl font-bold text-black mt-2">4.8/5</p>
              <p className="text-xs text-black/70 mt-2">Basee sur 124 avis</p>
            </article>
          </div>
          </article>
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <article className="lg:col-span-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-black">Consommation hebdomadaire</h2>
                <span className="text-xs text-black/80">Tasses par jour</span>
              </div>

              <div className="flex items-end gap-3 h-56">
                {weeklyConsumption.map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full rounded-md bg-white h-44 flex items-end overflow-hidden">
                      <div
                        className="w-full rounded-md bg-gradient-to-t from-[#1b2743] to-[#1b2743]"
                        style={{
                          height: `${(item.cups / maxWeeklyCups) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-black/80">{item.day}</span>
                  </div>
                ))}
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
            <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-lg bg-[#121435] p-2 text-center text-orange-900">Latte 70%</div>
              <div className="rounded-lg bg-[#121435] p-2 text-center text-orange-900">Esp 45%</div>
              <div className="rounded-lg bg-[#121435] p-2 text-center text-orange-900">Cap 35%</div>
            </div>
        </article>
        </section>
      </section>
    );
}

export default BodyDashboard;
