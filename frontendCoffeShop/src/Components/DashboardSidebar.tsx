import { NavLink, useNavigate } from 'react-router-dom';
import { adminProfile, getAdminInitials } from '../data/adminProfile';
import logo from '/public/logo.svg';

type Props = {
  open: boolean;
  onClose: () => void;
};


const navLinkClass = ({ isActive, isDisabled }: { isActive: boolean; isDisabled: boolean }) =>
  `flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
    isActive ? 'bg-[#f68716] text-black shadow-sm' : 'text-black'
  } ${isDisabled ? 'cursor-not-allowed opacity-30 bg-white hover:bg-white' : 'bg-[#f68716] hover:bg-orange-100'}`;


const items = [
  { to: '/dashboard', end: true, label: 'Tableau de bord', icon: IconLayout },
  { to: '/dashboard/utilisateurs', end: false, label: 'Utilisateurs', icon: IconUsers },
  { to: '/dashboard/rapports', end: false, label: 'Rapports', icon: IconChart },
  { to: '/dashboard/parametres', end: false, label: 'Paramètres', icon: IconSettings },
] as const;

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

function IconChart() {
  return (
    <svg className="size-5 shrink-0 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg className="size-5 shrink-0 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
    <header className="flex shrink-0 items-center gap-3 border-b border-gray-200 bg-[#f3f4f6] px-4 py-3 backdrop-blur-sm lg:hidden">
      <button
        type="button"
        className="rounded-lg border border-[#f68716]/25 p-2 text-black transition hover:bg-[#f68716]/10"
        aria-label="Ouvrir le menu"
        onClick={onOpenMenu}
      >
        <IconMenu />
      </button>
      <span className="font-semibold text-black">
        {adminProfile.fullName.split(/\s+/)[0] ?? 'Admin'}
      </span>
    </header>
  );
}

const DashboardSidebar = ({ open, onClose }: Props) => {
  const navigate = useNavigate();

  const handleNav = () => {
    onClose();
  };

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
          <p className="truncate font-semibold leading-tight text-black">Coffee Admin</p>
          <p className="mt-0.5 text-xs text-black/70">Espace café</p>
        </div>
      </div>


      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4" aria-label="Navigation principale">
  {items.map(({ to, end, label, icon: Icon }) => {
    const isDisabled = label !== 'Utilisateurs'; 
    return (
      <NavLink
        key={to}
        to={isDisabled ? '#' : to}
        end={end}
        className={({ isActive }) => navLinkClass({ isActive, isDisabled })}
        onClick={(e) => isDisabled && e.preventDefault()}
      >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </NavLink>
    );
  })}
</nav>

  <div className="border-t border-orange-900/10 p-3">
      <NavLink
          to="/dashboard/parametres"
          onClick={(e) => e.preventDefault()}
          className="mb-2 cursor-not-allowed opacity-30 bg-white flex w-full items-center justify-center gap-2 rounded-xl border border-orange-900/20 px-4 py-2.5 text-black transition"
          >
  <svg
    className="size-4"
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
    <p className="truncate font-semibold">{adminProfile.fullName}</p>
    <p className="truncate text-xs text-orange-900/70">{adminProfile.role}</p>
  </div>
</NavLink>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#f68716]/25 px-4 py-2.5 text-sm font-medium text-black transition hover:border-[#f68716]/40 hover:bg-[#f68716]/15"
          onClick={() => {
            onClose();
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
