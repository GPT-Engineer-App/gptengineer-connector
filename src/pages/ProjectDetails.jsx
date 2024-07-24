import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fetchProjectDetails = async (id) => {
  // TODO: Replace with actual API call
  return {
    id,
    name: `Project ${id}`,
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
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{project.name}</h1>
      </header>

      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Files</h2>
          <ul className="list-disc pl-5">
            {project.files.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Upload File</h2>
          <div className="flex gap-4">
            <Input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload} disabled={!file}>Upload</Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Commit History</h2>
          <ul className="space-y-2">
            {project.commits.map((commit) => (
              <li key={commit.id} className="bg-gray-100 p-4 rounded">
                <p className="font-semibold">{commit.message}</p>
                <p className="text-sm text-gray-600">{commit.date}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetails;