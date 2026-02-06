import { useState } from "react";
import {
  Sidebar,
  NoTeamView,
  MatchingFormView,
  MatchingPendingView,
  MeetTeamView,
  HasTeamView,
} from "@/components/team-matching";

type TeamState =
  | "no-team"
  | "matching-form"
  | "matching-pending"
  | "meet-team"
  | "has-team-new"
  | "has-team-full";

interface TeamMember {
  full_name: string;
  email: string;
}

// Demo data for the "full team" and "meet team" views
const demoMembers: TeamMember[] = [
  { full_name: "Tina Chen", email: "tc663@cornell.edu" },
  { full_name: "Tina Chen", email: "tc663@cornell.edu" },
  { full_name: "Tina Chen", email: "tc663@cornell.edu" },
];

export default function TeamPage() {
  const [view, setView] = useState<TeamState>("no-team");

  const handleJoinTeam = (_code: string) => {
    // TODO: API call to join team by code
    setView("has-team-full");
  };

  const handleCreateTeam = () => {
    // TODO: API call to create a new team
    setView("has-team-new");
  };

  const handleFillMatchForm = () => {
    setView("matching-form");
  };

  const handleMatchFormSubmit = async (_data: Record<string, any>) => {
    // TODO: POST to /api/participants
    setView("matching-pending");
  };

  const handleEditPreferences = () => {
    setView("matching-form");
  };

  const handleViewTeam = () => {
    setView("has-team-full");
  };

  const handleLeaveTeam = () => {
    // TODO: API call to leave team
    setView("no-team");
  };

  const renderView = () => {
    switch (view) {
      case "no-team":
        return (
          <NoTeamView
            onJoinTeam={handleJoinTeam}
            onCreateTeam={handleCreateTeam}
            onFillMatchForm={handleFillMatchForm}
          />
        );
      case "matching-form":
        return (
          <MatchingFormView
            onBack={() => setView("no-team")}
            onSubmit={handleMatchFormSubmit}
          />
        );
      case "matching-pending":
        return (
          <MatchingPendingView
            onEditPreferences={handleEditPreferences}
            onBack={() => setView("no-team")}
          />
        );
      case "meet-team":
        return (
          <MeetTeamView
            members={demoMembers}
            onViewTeam={handleViewTeam}
            onBack={() => setView("no-team")}
          />
        );
      case "has-team-new":
        return (
          <HasTeamView
            teamNumber={1022}
            teamCode="SJ3432"
            members={[]}
            onLeaveTeam={handleLeaveTeam}
          />
        );
      case "has-team-full":
        return (
          <HasTeamView
            teamNumber={1021}
            teamCode="SJ3432"
            members={demoMembers}
            onLeaveTeam={handleLeaveTeam}
          />
        );
    }
  };

  return (
    <div className="bg-[#fffdfa] flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-5 items-center p-10">
        {renderView()}
      </div>
    </div>
  );
}
