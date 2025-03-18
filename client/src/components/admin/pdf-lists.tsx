import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  usePdfs,
  useDownloadPdf,
  useDeletePdf,
  useUploadPdfs,
  useBulkDownloadPdfs,
} from "@/hooks/admin/pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Trash2, Upload, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
// import { format } from "date-fns";
import { RootState } from "@/store/store";
import { handleError } from "@/helpers/handle-error";
import { formatDate } from "@/helpers/formatdate";

// Upload Dialog Component
const UploadDialog = () => {
  const [open, setOpen] = useState(false);
  const uploadPdfMutation = useUploadPdfs();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
          resetForm();
          setOpen(false);
        },
        onError: (error) => {
          handleError(error);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Upload PDFs
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload PDFs</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
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

          <div className="space-y-2">
            <Label htmlFor="files">Select Files</Label>
            <Input
              id="files"
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileSelect}
            />
            {selectedFiles.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {selectedFiles.length} file(s) selected
              </div>
            )}
          </div>

          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={uploadPdfMutation.isPending || !title.trim()}
          >
            {uploadPdfMutation.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {uploadPdfMutation.isPending ? "Uploading..." : "Upload PDFs"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main PDF List Component
export const PdfList = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [selectedPdfs, setSelectedPdfs] = useState<string[]>([]);

  const isAdmin = useSelector(
    (state: RootState) => state.user.role === "admin"
  );
  const { data, isLoading } = usePdfs(page, limit);
  const downloadPdfMutation = useDownloadPdf();
  const bulkDownloadMutation = useBulkDownloadPdfs();
  const deletePdfMutation = useDeletePdf();

  const handleDownload = (id: string) => {
    downloadPdfMutation.mutate(id, {
      onError: () => toast.error("Failed to download PDF"),
    });
  };

  const handleBulkDownload = () => {
    if (selectedPdfs.length === 0) {
      toast.error("Please select PDFs to download");
      return;
    }

    bulkDownloadMutation.mutate(selectedPdfs, {
      onSuccess: () => {
        toast.success("PDFs downloaded successfully");
        setSelectedPdfs([]);
      },
      onError: () => toast.error("Failed to download PDFs"),
    });
  };

  const handleDelete = (id: string) => {
    deletePdfMutation.mutate(id, {
      onSuccess: () => {
        toast.success("PDF deleted successfully");
        setSelectedPdfs((prev) => prev.filter((pdfId) => pdfId !== id));
      },
      onError: () => toast.error("Failed to delete PDF"),
    });
  };

  const togglePdfSelection = (id: string) => {
    setSelectedPdfs((prev) =>
      prev.includes(id) ? prev.filter((pdfId) => pdfId !== id) : [...prev, id]
    );
  };

  const toggleAllPdfs = () => {
    if (!data?.data) return;

    setSelectedPdfs((prev) =>
      prev.length === data.data.length ? [] : data.data.map((pdf) => pdf.id)
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>PDF Documents</CardTitle>
        <div className="flex gap-2">
          {selectedPdfs.length > 0 && (
            <Button
              variant="outline"
              onClick={handleBulkDownload}
              disabled={bulkDownloadMutation.isPending}
            >
              {bulkDownloadMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Download Selected ({selectedPdfs.length})
            </Button>
          )}
          <UploadDialog />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left w-10">
                    <Checkbox
                      checked={
                        (data?.data?.length ?? 0) > 0 &&
                        selectedPdfs.length === data?.data.length
                      }
                      onCheckedChange={toggleAllPdfs}
                    />
                  </th>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Filename</th>
                  <th className="p-3 text-left">Created</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((pdf) => (
                  <tr key={pdf.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <Checkbox
                        checked={selectedPdfs.includes(pdf.id)}
                        onCheckedChange={() => togglePdfSelection(pdf.id)}
                      />
                    </td>
                    <td className="p-3 font-medium">{pdf.title}</td>
                    <td className="p-3 text-muted-foreground">
                      {pdf.description || "-"}
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {pdf.filename}
                    </td>
                    <td className="p-3 text-sm">{formatDate(pdf.createdAt)}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(pdf.id)}
                          disabled={downloadPdfMutation.isPending}
                        >
                          {downloadPdfMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                        </Button>
                        {isAdmin && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(pdf.id)}
                            disabled={deletePdfMutation.isPending}
                          >
                            {deletePdfMutation.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data?.pagination && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {Math.ceil(data.pagination.total / limit)}
              </span>
              <Button
                variant="outline"
                disabled={page >= Math.ceil(data.pagination.total / limit)}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
