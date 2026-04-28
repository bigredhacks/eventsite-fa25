type Status = "pending" | "accepted" | "waitlisted" | "rejected";

const COLORS: Record<Status, string> = {
  pending:    "bg-yellow-100 text-yellow-800",
  accepted:   "bg-green-100 text-green-800",
  waitlisted: "bg-blue-100 text-blue-800",
  rejected:   "bg-red-100 text-red-800",
};

export function StatusBadge({ status }: { status: string }) {
  const cls = COLORS[status as Status] ?? "bg-gray-100 text-gray-700";
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${cls}`}>
      {status}
    </span>
  );
}
