import { useState } from 'react';
import { adminProfile } from '../../data/adminProfile';

const field =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition';

const Parametres = () => {
  const [cafeName, setCafeName] = useState('Coffee Admin — Siège');
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyReports, setNotifyReports] = useState(false);
  const [notifyWeekly, setNotifyWeekly] = useState(true);

  return (
    <section className="w-full min-h-screen p-6 lg:ml-64 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Admin Profile */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-900">Profil administrateur</h2>
          <p className="mt-1 text-sm text-gray-500">Informations affichées dans la barre latérale.</p>
          <div className="mt-5 space-y-4">
            <div>
            <label htmlFor="admin-name" className="mb-1 block text-sm text-gray-700">Nom complet</label>
            <input id="admin-name" type="text" readOnly value={adminProfile.fullName} className={field} />
            </div>
            <div>
              <label htmlFor="admin-email" className="mb-1 block text-sm text-gray-700">Email</label>
              <input id="admin-email" type="email" readOnly value={adminProfile.email} className={field} />
            </div>
            <div>
              <label htmlFor="admin-role" className="mb-1 block text-sm text-gray-700">Rôle</label>
              <input id="admin-role" type="text" readOnly value={adminProfile.role} className={field} />
            </div>
            <p className="text-xs text-gray-400">
              Modification disponible après branchement à l’API d’authentification.
            </p>
          </div>
        </section>

        {/* Cafe Info */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-900">Établissement</h2>
          <p className="mt-1 text-sm text-gray-500">Nom affiché sur les reçus et exports.</p>
          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="cafe-name" className="mb-1 block text-sm text-gray-700">Nom du café</label>
              <input
                id="cafe-name"
                type="text"
                value={cafeName}
                onChange={(e) => setCafeName(e.target.value)}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="timezone" className="mb-1 block text-sm text-gray-700">Fuseau horaire</label>
              <select id="timezone" className={field} defaultValue="Europe/Paris">
                <option value="Europe/Paris">Europe / Paris</option>
                <option value="Europe/Casablanca">Africa / Casablanca</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm text-gray-500">Choisis les alertes envoyées par email ou dans l’app.</p>
          <ul className="mt-5 space-y-4">
            {[
              { title: 'Nouvelles commandes', description: 'Quand un client passe en attente', state: notifyOrders, toggle: () => setNotifyOrders(v => !v) },
              { title: 'Rapport quotidien', description: 'Résumé des ventes chaque matin', state: notifyReports, toggle: () => setNotifyReports(v => !v) },
              { title: 'Synthèse hebdomadaire', description: 'Tendances et stocks le lundi', state: notifyWeekly, toggle: () => setNotifyWeekly(v => !v) },
            ].map((item, idx) => (
              <li key={idx} className="flex justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={item.state}
                  onClick={item.toggle}
                  className={`relative h-7 w-12 rounded-full transition ${item.state ? 'bg-orange-500' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transform transition ${item.state ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Security */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900">Sécurité</h2>
          <p className="mt-1 text-sm text-gray-500">Mot de passe et sessions.</p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <button className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100 transition">
              Changer le mot de passe
            </button>
            <button className="rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 px-5 py-3 text-white font-semibold hover:opacity-90 transition">
              Enregistrer les préférences
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Parametres;