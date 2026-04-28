export type AdminView = "stats" | "registrations" | "checkin" | "export";

const TABS: { id: AdminView; label: string }[] = [
  { id: "stats",         label: "Stats" },
  { id: "registrations", label: "Registrations" },
  { id: "checkin",       label: "Check-In" },
  { id: "export",        label: "Export" },
];

interface AdminTabBarProps {
  current: AdminView;
  onChange: (view: AdminView) => void;
}

export function AdminTabBar({ current, onChange }: AdminTabBarProps) {
  return (
    <div className="flex gap-1 border-b border-red2 mb-6">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-5 py-2.5 text-sm font-semibold font-poppins rounded-t-lg transition-colors ${
            current === tab.id
              ? "bg-white text-red5 border border-b-white border-red2 -mb-px"
              : "text-gray-500 hover:text-red5"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
