import { StatCard } from '@/components/data-display';

type UserStatsData = {
  total: number;
  stat1: { label: string; value: number };
  stat2: { label: string; value: number };
  stat3: { label: string; value: number };
  stat4: { label: string; value: number };
};

type UserStatsProps = {
  stats: UserStatsData;
};

export function UserStats({ stats }: UserStatsProps) {
  return (
    <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
      <StatCard variant="info" label="전체" value={stats.total} />
      <StatCard variant="success" label={stats.stat1.label} value={stats.stat1.value} />
      <StatCard variant="warning" label={stats.stat2.label} value={stats.stat2.value} />
      <StatCard variant="error" label={stats.stat3.label} value={stats.stat3.value} />
      <StatCard variant="secondary" label={stats.stat4.label} value={stats.stat4.value} />
    </div>
  );
}

