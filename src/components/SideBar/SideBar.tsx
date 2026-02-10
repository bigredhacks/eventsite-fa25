import SideButtonSet from "./SideButtonSet";
import logo from "../../assets/brh_logo_sidebar.png";

const Sidebar = () => {
  return (
    <aside className="w-56 h-screen bg-red5 rounded-lg flex flex-col p-6 fixed left-0 top-0 ">
      <div className="mb-7">
        <img src={logo} alt="Logo" className="w-36 mx-auto mb-4" />
      </div>

      <nav className="flex-1 space-y-2">
        <SideButtonSet />
      </nav>
    </aside>
  );
};

export default Sidebar;