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

  if (isLoading) return <div>Loading project details...</div>;
  if (error) return <div>Error loading project details: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="text-xl text-gray-600">{project.description}</p>
      </header>

      <ResizablePanelGroup direction="horizontal" className="flex-grow rounded-lg border">
        <ResizablePanel defaultSize={75} minSize={30}>
          <div className="p-6 h-full overflow-auto">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
              <div className="bg-secondary p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Files</h3>
                <ul className="list-disc pl-5 mb-4">
                  {project.files.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ul>
                <h3 className="text-xl font-semibold mb-2">Commit History</h3>
                <ul className="space-y-2">
                  {project.commits.map((commit) => (
                    <li key={commit.id} className="bg-background p-2 rounded">
                      <p className="font-semibold">{commit.message}</p>
                      <p className="text-sm text-gray-600">{commit.date}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Upload File</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input type="file" onChange={handleFileChange} className="flex-grow" />
                <Button onClick={handleUpload} disabled={!file}>Upload</Button>
              </div>
            </section>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25} minSize={20}>
          <ChatBox className="h-full" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ProjectDetails;