import { useEffect, useState } from "react";
import { HasTeamView, NoTeamView } from "@/components/team-matching";

interface ParticipantData {
  id: string;
  full_name: string;
  email: string;
  hacker_type: string;
  frontend_experience: string;
  backend_experience: string;
  design_experience: string;
  hardware_experience: string;
  frontend_preference: number;
  backend_preference: number;
  design_preference: number;
  hardware_preference: number;
  any_role_preference: number;
  frontend_skills: string[];
  backend_skills: string[];
  design_skills: string[];
  hardware_skills: string[];
}

interface TeamData {
  team_number: number;
  members: ParticipantData[];
}

interface TeamsResponse {
  pool_id: string;
  total_participants: number;
  total_teams: number;
  teams: TeamData[];
  message?: string;
}

export default function TeamPage() {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [poolId] = useState("default");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`/api/teams?pool_id=${poolId}`);
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to fetch teams");
        }
        const data: TeamsResponse = await res.json();
        setTeams(data.teams ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [poolId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <p className="text-gray-600">Loading teams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">{error}</p>
          <p className="text-sm text-gray-500">
            Make sure participants exist in the pool and the backend is running.
          </p>
        </div>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="min-h-screen bg-white text-black py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            BigRed<span className="text-red-600">//</span>Hacks Team Matching
          </h1>
          <NoTeamView
            frontendPreference={0}
            backendPreference={0}
            designPreference={0}
            hardwarePreference={0}
            anyRolePreference={0}
          />
          <p className="text-center text-sm text-gray-500 mt-4">
            No teams have been generated yet. Add participants first, then generate teams via the API.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          BigRed<span className="text-red-600">//</span>Hacks Team Matching
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {teams.length} team{teams.length !== 1 ? "s" : ""} generated
        </p>
        <div className="grid gap-6">
          {teams.map((team) => (
            <HasTeamView
              key={team.team_number}
              teamNumber={team.team_number}
              members={team.members}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
