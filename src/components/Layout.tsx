import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/accounts": "Social Accounts",
  "/schedular": "Post Scheduler", // matches your route exactly
  "/ai-composer": "AI Composer",
};

const pageSubtitles: Record<string, string> = {
  "/dashboard": "Manage and automate your social presence",
  "/accounts": "Connect and manage your social accounts",
  "/schedular": "Plan and schedule upcoming posts",
  "/ai-composer": "Generate post content with AI",
};

function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? "Dashboard";
  const subtitle = pageSubtitles[pathname] ?? "";

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 md:px-8 gap-4 shrink-0">
          <button
            className="md:hidden p-2 -ml-2 text-slate-500"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon className="size-6" />
          </button>
          <div>
            <h1 className="text-slate-900 font-semibold text-lg leading-tight">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 xl:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;