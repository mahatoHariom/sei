import React, { useState, useRef } from "react";
import { useUploadPdfs } from "@/hooks/admin/pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { handleError } from "@/helpers/handle-error";

export const UploadPdf = () => {
  const uploadPdfMutation = useUploadPdfs();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      toast.error("Please select at least one PDF file");
      return;
    }
    if (!title.trim()) {
      toast.error("Please provide a title");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("pdfs", file);
    });
    formData.append("title", title.trim());
    if (description?.trim()) {
      formData.append("description", description.trim());
    }

    uploadPdfMutation.mutate(
      { formData },
      {
        onSuccess: () => {
          toast.success("PDFs uploaded successfully");
          setSelectedFiles([]);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          setTitle("");
          setDescription("");
        },
        onError: (error) => {
          handleError(error);
        },
      }
    );
  };

  return (
    <div className="space-y-4 max-w-lg">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter document title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter document description"
          className="h-24"
        />
      </div>

      <div className="flex gap-4 items-center">
        <Input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileSelect}
        />
        <Button
          onClick={handleUpload}
          disabled={uploadPdfMutation.isPending || !title.trim()}
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploadPdfMutation.isPending ? "Uploading..." : "Upload PDFs"}
        </Button>
      </div>
    </div>
  );
};
