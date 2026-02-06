import TeamMemberCard from "./TeamMemberCard";

interface Member {
  id: string;
  full_name: string;
  email: string;
  hacker_type: string;
  frontend_experience: string;
  backend_experience: string;
  design_experience: string;
  hardware_experience: string;
  frontend_skills: string[];
  backend_skills: string[];
  design_skills: string[];
  hardware_skills: string[];
}

interface HasTeamViewProps {
  teamNumber: number;
  members: Member[];
}

export default function HasTeamView({ teamNumber, members }: HasTeamViewProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Team {teamNumber}
      </h2>
      <div className="grid gap-3">
        {members.map((member) => (
          <TeamMemberCard
            key={member.id}
            name={member.full_name}
            email={member.email}
            hackerType={member.hacker_type}
            frontendExperience={member.frontend_experience}
            backendExperience={member.backend_experience}
            designExperience={member.design_experience}
            hardwareExperience={member.hardware_experience}
            frontendSkills={member.frontend_skills}
            backendSkills={member.backend_skills}
            designSkills={member.design_skills}
            hardwareSkills={member.hardware_skills}
          />
        ))}
      </div>
    </div>
  );
}
