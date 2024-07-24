import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatBox from "@/components/ChatBox";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const fetchProjectDetails = async (id) => {
  // TODO: Replace with actual API call
  return {
    id,
    name: `Project ${id}`,
    description: `This is the description for Project ${id}`,
    files: ["file1.txt", "file2.js", "file3.css"],
    commits: [
      { id: 1, message: "Initial commit", date: "2024-03-01" },
      { id: 2, message: "Update README", date: "2024-03-02" },
    ],
  };
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: () => fetchProjectDetails(id)
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // TODO: Implement file upload logic
    console.log("Uploading file:", file);
  };

  if (isLoading) return <div className="text-muted-foreground">Loading project details...</div>;
  if (error) return <div className="text-destructive">Error loading project details: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8 h-screen flex flex-col rustic-text">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">{project.name}</h1>
        <p className="text-xl text-muted-foreground">{project.description}</p>
      </header>

      <ResizablePanelGroup direction="horizontal" className="flex-grow rounded-lg rustic-border">
        <ResizablePanel defaultSize={75} minSize={30}>
          <div className="p-6 h-full overflow-auto frame-bg">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Project Overview</h2>
              <div className="bg-card p-4 rounded-lg rustic-border">
                <h3 className="text-xl font-semibold mb-2 text-primary">Files</h3>
                <ul className="list-disc pl-5 mb-4 text-muted-foreground">
                  {project.files.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ul>
                <h3 className="text-xl font-semibold mb-2 text-primary">Commit History</h3>
                <ul className="space-y-2">
                  {project.commits.map((commit) => (
                    <li key={commit.id} className="bg-muted p-2 rounded rustic-border">
                      <p className="font-semibold text-primary">{commit.message}</p>
                      <p className="text-sm text-muted-foreground">{commit.date}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">Upload File</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input type="file" onChange={handleFileChange} className="flex-grow bg-muted text-muted-foreground border-primary" />
                <Button onClick={handleUpload} disabled={!file} className="bg-primary text-primary-foreground hover:bg-primary/90">Upload</Button>
              </div>
            </section>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25} minSize={20}>
          <ChatBox className="h-full frame-bg" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ProjectDetails;