import React from "react";
import { Link, useLocation } from "react-router-dom";

type SideButtonProps = {
    to: string; 
    children: React.ReactNode; 
    icon?: string;
    activeIcon?: string;
    className?: string; 
}; 

const SideButton: React.FC<SideButtonProps> = ({
  to,
  children,
  icon,
  activeIcon,
  className,
}) => {
    const location = useLocation(); 
    const isActive = location.pathname === to; 
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 h-12 font-medium rounded-lg transition ${
        isActive 
            ? 'bg-white text-red5'
            : 'text-white hover:bg-red4'
      } ${className || ''}`}

    >
      {icon && (
        <img 
          src={isActive && activeIcon ? activeIcon : icon} 
          alt="" 
          className="w-7" 
        />
      )}
      <span className="font-poppins">{children}</span>
    </Link>
  );
};

export default SideButton;