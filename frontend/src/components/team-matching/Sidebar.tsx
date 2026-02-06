import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/brh_logo_white.png";
import iconDashboard from "@/assets/team/icon-dashboard.svg";
import iconProfile from "@/assets/team/icon-profile.svg";
import iconRegister from "@/assets/team/icon-register.svg";
import iconTeam from "@/assets/team/icon-team.svg";
import iconLogout from "@/assets/team/icon-logout.svg";

const navItems = [
  { label: "Dashboard", icon: iconDashboard, path: "/" },
  { label: "Profile", icon: iconProfile, path: "/profile" },
  { label: "Register", icon: iconRegister, path: "/apply" },
  { label: "Team", icon: iconTeam, path: "/team" },
];

// CSS filter to convert white SVG icons to #e46966 for active state
const activeIconFilter =
  "brightness(0) saturate(100%) invert(52%) sepia(63%) saturate(1067%) hue-rotate(322deg) brightness(93%) contrast(90%)";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-[#e46966] flex flex-col items-start rounded-tr-lg rounded-br-lg w-[239px] shrink-0 sticky top-0 h-screen overflow-y-auto">
      {/* Logo */}
      <div className="h-[171px] overflow-hidden w-full flex items-center justify-center shrink-0">
        <img src={logo} alt="Big Red Hacks" className="h-[92px] w-[173px] object-cover" />
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-2.5 px-[15px] py-5 w-full flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex gap-5 h-[50px] items-center px-5 rounded-lg w-full ${
                isActive ? "bg-white" : ""
              }`}
            >
              <img
                src={item.icon}
                alt=""
                className="w-[35px] h-[35px] object-contain"
                style={isActive ? { filter: activeIconFilter } : undefined}
              />
              <span
                className={`font-medium text-xl ${
                  isActive ? "text-[#e46966]" : "text-white"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Logout */}
        <button className="flex gap-5 h-[50px] items-center px-5 rounded-lg w-full">
          <img src={iconLogout} alt="" className="w-[34px] h-[34px] object-contain" />
          <span className="font-medium text-xl text-white">Logout</span>
        </button>
      </div>
    </div>
  );
}
