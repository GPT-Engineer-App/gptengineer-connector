import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

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

  if (isLoading) return <div className="flex justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  if (error) return <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>Failed to load project details: {error.message}</AlertDescription></Alert>;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{project.name}</h1>
      </header>

      <main className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Files</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {project.files.map((file, index) => (
                <li key={index}>{file}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload File</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input type="file" onChange={handleFileChange} />
              <Button onClick={handleUpload} disabled={!file}>Upload</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commit History</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {project.commits.map((commit) => (
                <li key={commit.id} className="bg-gray-100 p-4 rounded">
                  <p className="font-semibold">{commit.message}</p>
                  <p className="text-sm text-gray-600">{commit.date}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProjectDetails;