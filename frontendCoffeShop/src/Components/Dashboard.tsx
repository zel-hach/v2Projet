import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar, { DashboardMobileHeader } from './DashboardSidebar';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full justify-between bg-[#070814] text-black antialiased">
      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/55 lg:hidden"
          aria-label="Fermer le menu"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col bg-slate-100">
          <DashboardMobileHeader onOpenMenu={() => setSidebarOpen(true)} />
        <main className="flex-1 flex overflow-y-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
