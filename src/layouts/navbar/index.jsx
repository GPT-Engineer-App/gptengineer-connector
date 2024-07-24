import { navItems } from "@/nav-items";
import { Outlet } from "react-router-dom";
import { DesktopNavbar } from "./_components/DesktopNavbar";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground rustic-text">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b border-primary bg-secondary bg-opacity-90 px-4 md:px-6 justify-between">
        <DesktopNavbar navItems={navItems} />
      </header>
      <main className="flex-grow overflow-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;