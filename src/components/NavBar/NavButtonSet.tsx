// components/NavButtonSet.tsx
import React from "react";
import NavButton from "./NavButton";

type Props = {
  setDisableHideUntil: React.Dispatch<React.SetStateAction<number>>;
  onLinkClick?: () => void;
};

const NavButtonSet: React.FC<Props> = ({
  setDisableHideUntil,
  onLinkClick,
}) => {
  return (
    <>
      <NavButton
        targetId="about"
        setDisableHideUntil={setDisableHideUntil}
        onClick={onLinkClick}
      >
        About
      </NavButton>
      <NavButton
        targetId="tracks"
        setDisableHideUntil={setDisableHideUntil}
        onClick={onLinkClick}
      >
        Tracks
      </NavButton>
      <NavButton
        targetId="schedule"
        setDisableHideUntil={setDisableHideUntil}
        onClick={onLinkClick}
      >
        Schedule
      </NavButton>
      <NavButton
        targetId="faq"
        setDisableHideUntil={setDisableHideUntil}
        onClick={onLinkClick}
      >
        FAQ
      </NavButton>
      <NavButton
        targetId="sponsors"
        setDisableHideUntil={setDisableHideUntil}
        onClick={onLinkClick}
      >
        Sponsors
      </NavButton>
      <button
        onClick={onLinkClick}
        className="text-yellow2 border border-yellow2 rounded-full px-6 py-1
                 hover:bg-yellow2 hover:text-purple3 transition"
      >
        APPLY
      </button>
    </>
  );
};

export default NavButtonSet;
