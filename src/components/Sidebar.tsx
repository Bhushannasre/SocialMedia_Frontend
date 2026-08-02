import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, CalendarClock, Wand2, LogOutIcon } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const navItems = [
  { path: "/dashboard", name: "Dashboard", icon: LayoutDashboard },
  { path: "/accounts", name: "Social Accounts", icon: Users },
  { path: "/schedular", name: "Post Scheduler", icon: CalendarClock },
  { path: "/ai-composer", name: "AI Composer", icon: Wand2 },
];

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navigate = useNavigate();

  // TODO: replace with your real auth context, e.g. const { user, logout } = useAuth();
  const user = { name: "Bhushan", email: "bhushan@example.com" };
  const logout = () => {
    // TODO: clear auth token / call real logout endpoint before redirecting
    navigate("/", { replace: true });
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200
        flex flex-col h-full transform transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Logo */}
      <div className="p-6 pb-4">
        <div className="text-xl tracking-tight text-slate-800 flex items-center gap-1.5">
          <img src="/logo.svg" alt="logo" className="size-6" />
          Scheduler
        </div>
      </div>

      {/* Nav section label */}
      <div className="px-6 py-2">
        <span className="text-xs text-slate-500 uppercase tracking-wider">Menu</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-all duration-150 border ${
                isActive
                  ? "bg-red-50 text-red-600 border-red-500"
                  : "text-slate-500 hover:bg-slate-50 border-transparent hover:text-slate-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`size-4.5 shrink-0 ${isActive ? "text-red-500" : "text-slate-400"}`}
                />
                {item.name}
                {isActive && <span className="ml-auto w-[5px] h-5 rounded-full bg-red-500" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="size-8 rounded-full bg-gradient-to-br from-red-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium shrink-0">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-800 truncate">{user?.name}</div>
            <div className="text-xs text-slate-500 truncate">{user?.email}</div>
          </div>
        </div>
      </div>

      <button
        onClick={logout}
        className="mt-1 mb-3 mx-3 flex items-center gap-2 px-3 py-2.5 rounded text-sm text-slate-500 hover:bg-red-50 border border-transparent hover:text-slate-700 transition-all duration-150"
      >
        <LogOutIcon className="size-4 shrink-0" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;