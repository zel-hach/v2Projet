import { API_BASE_URL } from './apiConfig';

export type CupsByDay = {
  dayKey: string;
  label: string;
  cups: number;
};

export type DashboardStats = {
  investisseurCount: number;
  etudiantCount: number;
  visiteurCount: number;
  totalCups: number;
  cupsByDay: CupsByDay[];
};

export async function fetchDashboardStats(): Promise<DashboardStats | null> {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_BASE_URL}/api/stats/dashboard`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Stats error');
    }
    return data as DashboardStats;
  } catch {
    return null;
  }
}
