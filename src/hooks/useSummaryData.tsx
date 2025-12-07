import useFetchData from '@/hooks/useFetchData.tsx';
import { IUser } from '@/interfaces/User';
import type IDriver from '@/interfaces/Driver';
import type { Ride } from '@/interfaces/Ride';
import { useMemo } from 'react';

export type SummaryData = {
  usersCount: number;
  activeUsers: number;
  usersByDay: { label: string; value: number }[]; // last 7 days
  driversCount: number;
  approvedDrivers: number;
  driversByStatus: Record<string, number>;
  ridesCount: number;
  ridesByStatus: Record<string, number>;
  ridesByDay: { label: string; value: number }[]; // last 7 days
};

export default function useSummaryData() {
  const { data: usersRaw, isLoading: usersLoading, isError: usersError } = useFetchData<IUser[]>(
    '/apis/accounts/users/',
    ['users', 'summary'],
    {},
    true,
    1000 * 60 * 5
  );

  const { data: driversRaw, isLoading: driversLoading, isError: driversError } = useFetchData<IDriver[]>(
    '/apis/accounts/drivers/',
    ['drivers', 'summary'],
    {},
    true,
    1000 * 60 * 5
  );

  const { data: ridesRaw, isLoading: ridesLoading, isError: ridesError } = useFetchData<Ride[]>(
    '/apis/rides_apis/rides',
    ['rides', 'summary'],
    {},
    true,
    1000 * 60 * 5
  );

  const loading = usersLoading || driversLoading || ridesLoading;
  const error = usersError || driversError || ridesError;

  const users: IUser[] = Array.isArray(usersRaw) ? usersRaw : [];
  const drivers: IDriver[] = Array.isArray(driversRaw) ? driversRaw : [];
  const rides: Ride[] = Array.isArray(ridesRaw) ? ridesRaw : [];

  const summary: SummaryData = useMemo(() => {
    const usersCount = users.length;
    const activeUsers = users.filter((u) => (u.is_active ?? (u as any).status === 'active')).length;

    // helper for last N days
    const makeSeries = (items: { created_at?: string }[], days = 7) => {
      const now = new Date();
      const buckets: Record<string, number> = {};
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        const label = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        buckets[label] = 0;
      }
      items.forEach((it) => {
        if (!it?.created_at) return;
        const dt = new Date(it.created_at);
        if (isNaN(dt.getTime())) return;
        const label = dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        if (label in buckets) buckets[label] += 1;
      });
      return Object.keys(buckets).map((k) => ({ label: k, value: buckets[k] }));
    };

    const usersByDay = makeSeries(users, 7);
    const ridesByDay = makeSeries(rides as any as { created_at?: string }[], 7);

    const driversCount = drivers.length;
    const approvedDrivers = drivers.filter((d) => d.status === 'Approved').length;

    const driversByStatus: Record<string, number> = {};
    drivers.forEach((d) => {
      const k = d.status || 'unknown';
      driversByStatus[k] = (driversByStatus[k] || 0) + 1;
    });

    const ridesCount = rides.length;
    const ridesByStatus: Record<string, number> = {};
    rides.forEach((r) => {
      const k = r.status || 'unknown';
      ridesByStatus[k] = (ridesByStatus[k] || 0) + 1;
    });

    return {
      usersCount,
      activeUsers,
      usersByDay,
      driversCount,
      approvedDrivers,
      driversByStatus,
      ridesCount,
      ridesByStatus,
      ridesByDay,
    };
  }, [users, drivers, rides]);

  return { summary, loading, error };
}

