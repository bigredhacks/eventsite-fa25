import { useState } from "react";
import { exportData } from "../../utils/adminApi";

export function ExportView() {
  const [loading, setLoading] = useState<"csv" | "json" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async (format: "csv" | "json") => {
    setLoading(format);
    setError(null);
    try {
      await exportData(format);
    } catch (e: unknown) {
      setError(String(e));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4 max-w-sm">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Export Registrations
      </h2>
      <p className="text-sm text-gray-600">
        Download all registration data. Includes every field for all applicants.
      </p>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={() => handleExport("csv")}
          disabled={loading !== null}
          className="px-5 py-2.5 bg-red5 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold font-poppins rounded-lg transition-colors"
        >
          {loading === "csv" ? "Exporting…" : "Export as CSV"}
        </button>
        <button
          onClick={() => handleExport("json")}
          disabled={loading !== null}
          className="px-5 py-2.5 bg-white border border-red2 hover:bg-[#fbeae9] disabled:opacity-50 text-red5 text-sm font-semibold font-poppins rounded-lg transition-colors"
        >
          {loading === "json" ? "Exporting…" : "Export as JSON"}
        </button>
      </div>
    </div>
  );
}
