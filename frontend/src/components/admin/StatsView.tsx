import { useEffect, useState } from "react";
import { fetchStats, AdminStats } from "../../utils/adminApi";

const STATUS_COLORS: Record<string, string> = {
  pending:    "border-yellow-400 bg-yellow-50",
  accepted:   "border-green-400 bg-green-50",
  waitlisted: "border-blue-400 bg-blue-50",
  rejected:   "border-red-400 bg-red-50",
};

function BreakdownList({ title, data }: { title: string; data: Record<string, number> }) {
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
      <dl className="space-y-1">
        {sorted.map(([key, count]) => (
          <div key={key} className="flex justify-between text-sm">
            <dt className="text-gray-600 truncate max-w-[70%]">{key}</dt>
            <dd className="font-medium text-gray-800">{count}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function StatsView() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch((e: unknown) => setError(String(e)));
  }, []);

  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (!stats) return <p className="text-gray-500 text-sm">Loading stats…</p>;

  const statusOrder = ["pending", "accepted", "waitlisted", "rejected"];

  return (
    <div className="space-y-8">
      {/* Status cards */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Applications — {stats.total} total
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statusOrder.map((s) => (
            <div
              key={s}
              className={`rounded-xl border-l-4 p-4 ${STATUS_COLORS[s] ?? "border-gray-300 bg-gray-50"}`}
            >
              <p className="text-2xl font-bold text-gray-800">{stats.by_status[s] ?? 0}</p>
              <p className="text-xs font-medium text-gray-500 capitalize mt-0.5">{s}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border-l-4 border-purple-400 bg-purple-50 p-4 inline-block min-w-[150px]">
          <p className="text-2xl font-bold text-gray-800">{stats.checked_in}</p>
          <p className="text-xs font-medium text-gray-500 mt-0.5">Checked In</p>
        </div>
      </div>

      {/* Breakdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <BreakdownList title="By University" data={stats.by_university} />
        <BreakdownList title="By Graduation Year" data={stats.by_graduation_year} />
        <BreakdownList title="By Gender" data={stats.by_gender} />
        <BreakdownList title="By Level of Study" data={stats.by_level_of_study} />
        <BreakdownList title="By Dietary Restrictions" data={stats.by_dietary_restrictions} />
      </div>
    </div>
  );
}
