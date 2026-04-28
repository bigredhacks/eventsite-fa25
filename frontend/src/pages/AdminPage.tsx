import { useState } from "react";
import RegistrationLayout from "../components/layouts/RegistrationLayout";
import { AdminTabBar, AdminView } from "../components/admin/AdminTabBar";
import { StatsView } from "../components/admin/StatsView";
import { RegistrationsView } from "../components/admin/RegistrationsView";
import { CheckInView } from "../components/admin/CheckInView";
import { ExportView } from "../components/admin/ExportView";

const AdminPage = () => {
  const [view, setView] = useState<AdminView>("stats");

  return (
    <RegistrationLayout>
      <div className="h-full flex flex-col px-2 py-2">
        <h1 className="text-3xl font-medium text-red6 mb-4 pl-4">Admin Panel</h1>
        <main className="flex flex-1 flex-col px-4 overflow-y-auto">
          <AdminTabBar current={view} onChange={setView} />
          <div className="pb-8">
            {view === "stats"         && <StatsView />}
            {view === "registrations" && <RegistrationsView />}
            {view === "checkin"       && <CheckInView />}
            {view === "export"        && <ExportView />}
          </div>
        </main>
      </div>
    </RegistrationLayout>
  );
};

export default AdminPage;
