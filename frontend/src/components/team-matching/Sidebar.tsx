import { memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/brh_logo_white.png";
import iconDashboard from "@/assets/team/icon-dashboard.svg";
import iconProfile from "@/assets/team/icon-profile.svg";
import iconRegister from "@/assets/team/icon-register.svg";
import iconTeam from "@/assets/team/icon-team.svg";
import iconLogout from "@/assets/team/icon-logout.svg";

const navItems = [
  { label: "Dashboard", icon: iconDashboard, path: "/dashboard" },
  { label: "Profile", icon: iconProfile, path: "/profile" },
  { label: "Register", icon: iconRegister, path: "/register" },
  { label: "Team", icon: iconTeam, path: "/team" },
];

// CSS filter to convert white SVG icons to #e46966 for active state
const activeIconFilter =
  "brightness(0) saturate(100%) invert(52%) sepia(63%) saturate(1067%) hue-rotate(322deg) brightness(93%) contrast(90%)";

const Sidebar = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-[#e46966] flex flex-col items-start rounded-tr-lg rounded-br-lg w-[239px] shrink-0 sticky top-0 h-screen overflow-y-auto z-40">
      {/* Logo */}
      <div className="h-[171px] overflow-hidden w-full flex items-center justify-center shrink-0">
        <img 
          src={logo} 
          alt="Big Red Hacks" 
          className="h-[92px] w-[173px] object-cover" 
          loading="eager"
        />
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-2.5 px-[15px] py-5 w-full flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex gap-5 h-[50px] items-center px-5 rounded-lg w-full transition-colors duration-200 ${
                isActive ? "bg-white" : "hover:bg-white/10"
              }`}
            >
              <img
                src={item.icon}
                alt=""
                className="w-[35px] h-[35px] object-contain transition-all duration-200"
                style={isActive ? { filter: activeIconFilter } : undefined}
                loading="eager"
              />
              <span
                className={`font-medium text-xl font-poppins transition-colors duration-200 ${
                  isActive ? "text-[#e46966]" : "text-white"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Logout */}
        <button className="flex gap-5 h-[50px] items-center px-5 rounded-lg w-full hover:bg-white/10 transition-colors duration-200">
          <img 
            src={iconLogout} 
            alt="" 
            className="w-[34px] h-[34px] object-contain" 
            loading="eager"
          />
          <span className="font-medium text-xl text-white font-poppins">Logout</span>
        </button>
      </div>
    </div>
  );
});

Sidebar.displayName = 'TeamSidebar';

export default Sidebar;
