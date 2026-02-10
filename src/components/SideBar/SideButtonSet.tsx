import SideButton from "./SideButton";
import { ICONS } from "../../constants/icons"


const SideButtonSet = ({}) => {
  return (
    <>
      <SideButton
        to="/dashboard"
        icon={ICONS.dashboard}
        activeIcon={ICONS.activeDashboard}
      >
        Dashboard
      </SideButton>
      <SideButton
        to="/profile"
        icon={ICONS.profile}
        activeIcon={ICONS.activeProfile}
      >
        Profile
      </SideButton>
      <SideButton
        to="/register"
        icon={ICONS.register}
        activeIcon={ICONS.activeRegister}
      >
        Register
      </SideButton>
      <SideButton
        to="/team"
        icon={ICONS.team}
        activeIcon={ICONS.activeTeam}
      >
        Team
      </SideButton>
      <SideButton
        to="/login"
        icon={ICONS.logout}
      >
        Logout
      </SideButton>
    </>
  );
};

export default SideButtonSet;
