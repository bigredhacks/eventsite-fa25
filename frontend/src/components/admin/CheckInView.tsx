import { useState, useEffect } from "react";
import { searchCheckin, toggleCheckin, AdminRegistration } from "../../utils/adminApi";
import { StatusBadge } from "./StatusBadge";

function useDebounce<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

export function CheckInView() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AdminRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) { setResults([]); return; }
    setLoading(true);
    setError(null);
    searchCheckin(debouncedQuery)
      .then(setResults)
      .catch((e: unknown) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  const handleCheckin = async (reg: AdminRegistration) => {
    const newState = !reg.checked_in;
    try {
      const updated = await toggleCheckin(reg.id, newState);
      setResults((prev) => prev.map((r) => (r.id === reg.id ? updated : r)));
    } catch (e: unknown) {
      alert(`Check-in failed: ${String(e)}`);
    }
  };

  return (
    <div className="space-y-5 max-w-xl">
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Day-of Check-In
        </h2>
        <input
          type="text"
          placeholder="Search by name or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-red2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red5"
          autoFocus
        />
        <p className="text-xs text-gray-400 mt-1">Shows accepted applicants only.</p>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {loading && <p className="text-gray-400 text-sm">Searching…</p>}

      <ul className="space-y-3">
        {results.map((r) => (
          <li
            key={r.id}
            className="flex items-center justify-between bg-white border border-red2 rounded-xl px-4 py-3"
          >
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                {r.first_name} {r.last_name}
              </p>
              <p className="text-xs text-gray-500">{r.email ?? "—"}</p>
              <div className="mt-1">
                <StatusBadge status={r.status} />
              </div>
            </div>
            <button
              onClick={() => handleCheckin(r)}
              className={`ml-4 px-4 py-2 rounded-lg text-sm font-semibold font-poppins transition-colors ${
                r.checked_in
                  ? "bg-green-500 text-white cursor-default"
                  : "bg-red5 hover:bg-red-700 text-white"
              }`}
            >
              {r.checked_in ? "✓ Checked In" : "Check In"}
            </button>
          </li>
        ))}
        {!loading && query && results.length === 0 && (
          <p className="text-gray-400 text-sm">No accepted applicants found.</p>
        )}
      </ul>
    </div>
  );
}
