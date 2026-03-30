import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar, { DashboardMobileHeader } from './DashboardSidebar';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f3f4f6] text-black antialiased">
      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/55 lg:hidden"
          aria-label="Fermer le menu"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col bg-[#f3f4f6]">
        <DashboardMobileHeader onOpenMenu={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
