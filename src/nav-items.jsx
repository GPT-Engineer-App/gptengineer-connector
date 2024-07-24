import { Home, FolderOpen } from "lucide-react";
import Index from "./pages/Index.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Project Details",
    to: "/project/:id",
    icon: <FolderOpen className="h-4 w-4" />,
    page: <ProjectDetails />,
  },
];