import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import ChatBox from "@/components/ChatBox";
import ProjectCard from "@/components/ProjectCard";

const fetchProjects = async () => {
  // TODO: Replace with actual API call
  return [
    { id: 1, name: "Project 1", description: "This is project 1" },
    { id: 2, name: "Project 2", description: "This is project 2" },
    { id: 3, name: "Project 3", description: "This is project 3" },
  ];
};

const Index = () => {
  const [file, setFile] = useState(null);
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // TODO: Implement file upload logic
    console.log("Uploading file:", file);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">GPT Engineer Project Manager</h1>
        <p className="text-xl text-gray-600">Manage your GPT Engineer projects seamlessly</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          {isLoading ? (
            <p>Loading projects...</p>
          ) : error ? (
            <p>Error loading projects: {error.message}</p>
          ) : (
            <div className="grid gap-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>

        <section className="lg:col-span-1">
          <ChatBox />
        </section>

        <section className="lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Upload File</h2>
          <div className="flex gap-4">
            <Input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload} disabled={!file}>Upload</Button>
          </div>
        </section>
      </main>

      <footer className="mt-8 text-center text-gray-600">
        <p>&copy; 2024 GPT Engineer Project Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;