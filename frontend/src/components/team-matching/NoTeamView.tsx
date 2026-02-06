interface NoTeamViewProps {
  frontendPreference: number;
  backendPreference: number;
  designPreference: number;
  hardwarePreference: number;
  anyRolePreference: number;
}

export default function NoTeamView({
  frontendPreference,
  backendPreference,
  designPreference,
  hardwarePreference,
  anyRolePreference,
}: NoTeamViewProps) {
  const preferences = [
    { label: "Frontend", value: frontendPreference },
    { label: "Backend", value: backendPreference },
    { label: "Design", value: designPreference },
    { label: "Hardware", value: hardwarePreference },
    { label: "Any Role", value: anyRolePreference },
  ];

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white text-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        You're in the matching pool!
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Teams haven't been formed yet. Here's a summary of your preferences:
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        {preferences.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center">
            <span className="text-xs text-gray-500">{label}</span>
            <span className="text-lg font-bold text-gray-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
