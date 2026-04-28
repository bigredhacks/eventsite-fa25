import { useEffect, useState, useCallback } from "react";
import {
  fetchRegistrations,
  updateStatus,
  AdminRegistration,
} from "../../utils/adminApi";
import { StatusBadge } from "./StatusBadge";

const STATUSES = ["", "pending", "accepted", "waitlisted", "rejected"] as const;
const LIMIT = 50;

function useDebounce<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

export function RegistrationsView() {
  const [rows, setRows] = useState<AdminRegistration[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  const load = useCallback(async (p: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchRegistrations({
        status: statusFilter || undefined,
        search: debouncedSearch || undefined,
        page: p,
        limit: LIMIT,
      });
      setRows(result.data);
      setTotal(result.total);
    } catch (e: unknown) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, [statusFilter, debouncedSearch]);

  useEffect(() => { setPage(1); }, [statusFilter, debouncedSearch]);
  useEffect(() => { load(page); }, [load, page]);

  const handleStatusChange = async (id: number, newStatus: AdminRegistration["status"]) => {
    try {
      const updated = await updateStatus(id, newStatus);
      setRows((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch (e: unknown) {
      alert(`Failed to update status: ${String(e)}`);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-red2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red5 w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-red2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red5 bg-white"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s === "" ? "All statuses" : s}</option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-red2">
        <table className="w-full text-sm">
          <thead className="bg-[#fbeae9] text-gray-600 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">University</th>
              <th className="px-4 py-3 font-semibold">Grad Year</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red2">
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">Loading…</td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">No registrations found.</td>
              </tr>
            )}
            {!loading && rows.map((r) => (
              <tr key={r.id} className="hover:bg-[#fdf5f5] transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">
                  {r.first_name} {r.last_name}
                </td>
                <td className="px-4 py-3 text-gray-600">{r.email ?? "—"}</td>
                <td className="px-4 py-3 text-gray-600">{r.university ?? "—"}</td>
                <td className="px-4 py-3 text-gray-600">{r.graduation_year ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={r.status} />
                    <select
                      value={r.status}
                      onChange={(e) =>
                        handleStatusChange(r.id, e.target.value as AdminRegistration["status"])
                      }
                      className="text-xs border border-gray-200 rounded px-1 py-0.5 bg-white focus:outline-none"
                    >
                      {["pending", "accepted", "waitlisted", "rejected"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{total} total</span>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded border border-red2 disabled:opacity-40 hover:bg-[#fbeae9] transition-colors"
          >
            Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border border-red2 disabled:opacity-40 hover:bg-[#fbeae9] transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
