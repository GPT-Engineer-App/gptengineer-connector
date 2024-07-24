import { Package2 } from "lucide-react";
import { NavItem } from "./NavItem";

export const DesktopNavbar = ({ navItems }) => (
  <nav className="flex items-center gap-5 lg:gap-6 text-lg font-medium md:text-sm">
    <NavItem
      to="/"
      className="flex items-center gap-2 text-lg font-semibold md:text-base text-primary"
    >
      <Package2 className="h-6 w-6" />
      <span className="sr-only md:not-sr-only">Acme Inc</span>
    </NavItem>
    {navItems.map((item) => (
      <NavItem key={item.to} to={item.to} className="hidden md:block">
        {item.title}
      </NavItem>
    ))}
  </nav>
);