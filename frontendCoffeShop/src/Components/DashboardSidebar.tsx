import type React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  clearAuthSession,
  getSessionDisplayName,
  getSessionRoleLabel,
  getSessionShortName,
} from '../data/sessionUser';
import logo from '/public/logo.svg';

type Props = {
  open: boolean;
  onClose: () => void;
};

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
    isActive ? 'bg-[#f68716] text-black shadow-sm' : 'text-black bg-white hover:bg-orange-100'
  }`;

type MainNavItem = {
  to: string;
  end?: boolean;
  label: string;
  subtitle?: string;
  icon: () => React.ReactElement;
};

const mainNav: MainNavItem[] = [
  { to: '/dashboard', end: true, label: 'Tableau de bord', icon: IconLayout },
  { to: '/dashboard/visiteurs', end: false, label: 'Visiteur', subtitle: 'Tous', icon: IconUsers },
  { to: '/dashboard/investisseurs', end: false, label: 'Investisseur', subtitle: 'Fonctionnaire, CTO…', icon: IconBriefcase },
  { to: '/dashboard/etudiants', end: false, label: 'Étudiant', subtitle: 'Titulaire, étudiant', icon: IconGraduation },
];

function IconLayout() {
  return (
    <svg className="size-5 shrink-0 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg className="size-5 shrink-0 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function IconBriefcase() {
  return (
    <svg className="size-5 shrink-0 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function IconGraduation() {
  return (
    <svg className="size-5 shrink-0 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function DashboardMobileHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="flex shrink-0 items-center gap-3 border-b border-orange-900/15 bg-slate-100 px-4 py-3 backdrop-blur-sm lg:hidden">
      <button
        type="button"
        className="rounded-lg border border-orange-900/25 p-2 text-black orange-900 transition hover:bg-orange-900/10"
        aria-label="Ouvrir le menu"
        onClick={onOpenMenu}
      >
        <IconMenu />
      </button>
      <span className="font-semibold text-black orange-900">{getSessionShortName()}</span>
    </header>
  );
}

const DashboardSidebar = ({ open, onClose }: Props) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 h-screen flex flex-col bg-slate-100 border-r border-orange-900/15 shadow-[4px_0_24px_rgba(0,0,0,0.35)] transition-transform duration-200 ${
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="flex items-center gap-3 border-b border-orange-900/10 px-5 py-6">
        <div className="grid w-20 h-15 shrink-0 place-items-center rounded-xl object-cover text-black font-bold shadow-[0_8px_20px_rgba(255,87,34,0.35)]">
          <img src={logo} alt="logo" className="w-15 h-15 object-cover" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold leading-tight text-black orange-900">Coffee Admin</p>
          <p className="mt-0.5 text-black xs text-black orange-900/70">Espace café</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4" aria-label="Navigation principale">
        {mainNav.map(({ to, end, label, subtitle, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => onClose()}
            className={({ isActive }) => navLinkClass({ isActive })}
          >
            <span className="flex size-5 shrink-0 items-center justify-center opacity-90 [&>svg]:size-5">
              <Icon />
            </span>
            <span className="flex min-w-0 flex-col items-start gap-0.5">
              <span className="leading-tight">{label}</span>
              {subtitle ? (
                <span className="text-[10px] font-normal leading-tight text-black/60">{subtitle}</span>
              ) : null}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-orange-900/10 p-3">
        <div className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl border border-orange-900/20 bg-white px-4 py-2.5 text-black">
          <svg
            className="size-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{getSessionDisplayName()}</p>
            <p className="truncate text-xs text-orange-900/70">
              {getSessionRoleLabel() || 'Connecté'}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-orange-900/25 px-4 py-2.5 text-black sm font-medium text-black orange-900 transition hover:bg-red-500/15 hover:border-red-400/40 hover:text-black red-200"
          onClick={() => {
            onClose();
            clearAuthSession();
            navigate('/');
          }}
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
