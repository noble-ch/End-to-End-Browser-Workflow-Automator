import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/router";

export default function TaskFormDialog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // for user input description
  const [file, setFile] = useState(null);
  const [generatedDescription, setGeneratedDescription] = useState(""); // for generated description (not displayed)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const router = useRouter(); 

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGenerateDescription = async (recordId) => {
    console.log("rdid", recordId);
    try {
      const response = await fetch("/api/handler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit the task.");
      }

      const result = await response.json(); 
      if (result) {
        router.push(`/records/${recordId}`);
      } 
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !file) {
      setErrorMessage("All fields are required!");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(""); 

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setErrorMessage("Token is required");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description); // Use the user input description, not the generated one
    formData.append("file", file);

    try {
      const response = await fetch("/api/sendRecord", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit the task.");
      }

      const result = await response.json();
      const recordId = result.data._id;

      if (recordId) {
       handleGenerateDescription(recordId);
       console.log("recordid", recordId)
      } else {
        setErrorMessage("Failed to retrieve the record ID.");
      }

      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      setErrorMessage(error.message || "Error submitting the task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary w-1/2 m-4 hover:bg-white hover:text-primary border">
          Create a New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Task Creation Form</DialogTitle>
          <DialogDescription>
            Fill in the details below and attach your file.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input
              id="title"
              placeholder="Task title"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea
              id="description"
              placeholder="Task description"
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">Upload File</Label>
            <Input
              id="file"
              type="file"
              className="col-span-3"
              onChange={handleFileChange}
            />
          </div>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={isSubmitting ? "opacity-50" : ""}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

