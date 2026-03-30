import { useState } from 'react';
import { adminProfile } from '../../data/adminProfile';

const field =
  'w-full rounded-xl border border-[#f68716]/20 bg-white px-4 py-3 text-black outline-none placeholder:text-black/40 focus:border-[#f68716]/50 focus:ring-2 focus:ring-[#f68716]/20';

const Parametres = () => {
  const [cafeName, setCafeName] = useState('Coffee Admin — Siège');
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyReports, setNotifyReports] = useState(false);
  const [notifyWeekly, setNotifyWeekly] = useState(true);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-8">
      <div>
        <h1 className="text-2xl font-semibold text-black">Paramètres</h1>
        <p className="mt-1 text-sm text-black/75">
          Compte administrateur, établissement et préférences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#f68716]/20 bg-white p-6 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
          <h2 className="text-lg font-semibold text-black">Profil administrateur</h2>
          <p className="mt-1 text-xs text-black/70">Informations affichées dans la barre latérale.</p>
          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="admin-name" className="mb-2 block text-sm text-black">
                Nom complet
              </label>
              <input id="admin-name" type="text-black " readOnly value={adminProfile.fullName} className={field} />
            </div>
            <div>
              <label htmlFor="admin-email" className="mb-2 block text-sm text-black">
                Email
              </label>
              <input id="admin-email" type="email" readOnly value={adminProfile.email} className={field} />
            </div>
            <div>
              <label htmlFor="admin-role" className="mb-2 block text-sm text-black">
                Rôle
              </label>
              <input id="admin-role" type="text-black " readOnly value={adminProfile.role} className={field} />
            </div>
            <p className="text-xs text-black/60">
              La modification du profil sera disponible après branchement à l’API d’authentification.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-[#f68716]/20 bg-white p-6 shadow-[0_12px_30px_rgba(7,8,20,0.45)]">
          <h2 className="text-lg font-semibold text-black">Établissement</h2>
          <p className="mt-1 text-xs text-black/70">Nom affiché sur les reçus et exports.</p>
          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="cafe-name" className="mb-2 block text-sm text-black">
                Nom du café
              </label>
              <input
                id="cafe-name"
                type="text-black "
                value={cafeName}
                onChange={(e) => setCafeName(e.target.value)}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="timezone" className="mb-2 block text-sm text-black">
                Fuseau horaire
              </label>
              <select id="timezone" className={field} defaultValue="Europe/Paris">
                <option value="Europe/Paris">Europe / Paris</option>
                <option value="Europe/Casablanca">Africa / Casablanca</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#f68716]/20 bg-white p-6 shadow-[0_12px_30px_rgba(7,8,20,0.45)] lg:col-span-2">
          <h2 className="text-lg font-semibold text-black">Notifications</h2>
          <p className="mt-1 text-xs text-black/70">Choisis les alertes envoyées par email ou dans l’app.</p>
          <ul className="mt-5 space-y-4">
            <li className="flex items-center justify-between gap-4 rounded-xl border border-[#f68716]/15 bg-white/60 px-4 py-3">
              <div>
                <p className="font-medium text-black">Nouvelles commandes</p>
                <p className="text-xs text-black/65">Quand un client passe en attente</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifyOrders}
                onClick={() => setNotifyOrders((v) => !v)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${notifyOrders ? 'bg-[#FF5722]' : 'bg-white'}`}
              >
                <span
                  className={`absolute top-0.5 size-6 rounded-full bg-slate-100 shadow transition ${notifyOrders ? 'left-6' : 'left-0.5'}`}
                />
              </button>
            </li>
            <li className="flex items-center justify-between gap-4 rounded-xl border border-[#f68716]/15 bg-white/60 px-4 py-3">
              <div>
                <p className="font-medium text-black">Rapport quotidien</p>
                <p className="text-xs text-black/65">Résumé des ventes chaque matin</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifyReports}
                onClick={() => setNotifyReports((v) => !v)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${notifyReports ? 'bg-[#FF5722]' : 'bg-white'}`}
              >
                <span
                  className={`absolute top-0.5 size-6 rounded-full bg-slate-100 shadow transition ${notifyReports ? 'left-6' : 'left-0.5'}`}
                />
              </button>
            </li>
            <li className="flex items-center justify-between gap-4 rounded-xl border border-[#f68716]/15 bg-white/60 px-4 py-3">
              <div>
                <p className="font-medium text-black">Synthèse hebdomadaire</p>
                <p className="text-xs text-black/65">Tendances et stocks le lundi</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifyWeekly}
                onClick={() => setNotifyWeekly((v) => !v)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${notifyWeekly ? 'bg-[#FF5722]' : 'bg-white'}`}
              >
                <span
                  className={`absolute top-0.5 size-6 rounded-full bg-slate-100 shadow transition ${notifyWeekly ? 'left-6' : 'left-0.5'}`}
                />
              </button>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-[#f68716]/20 bg-white p-6 shadow-[0_12px_30px_rgba(7,8,20,0.45)] lg:col-span-2">
          <h2 className="text-lg font-semibold text-black">Sécurité</h2>
          <p className="mt-1 text-xs text-black/70">Mot de passe et sessions.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="rounded-xl border border-[#f68716]/30 px-5 py-3 text-sm font-medium text-black transition hover:bg-[#f68716]/10"
            >
              Changer le mot de passe
            </button>
            <button
              type="button"
              className="rounded-xl bg-[#FF5722]/90 px-5 py-3 text-black sm font-semibold text-black [#121435] transition hover:bg-[#FF5722]"
            >
              Enregistrer les préférences
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Parametres;
