import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{project.name}</CardTitle>
        <Link to={`/project/${project.id}`}>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{project.description}</p>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;