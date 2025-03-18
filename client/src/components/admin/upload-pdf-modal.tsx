// "use client";
// import React, { useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import {
//   usePdfs,
//   useDownloadPdf,
//   useDeletePdf,
//   useUploadPdfs,
//   useBulkDownloadPdfs,
// } from "@/hooks/admin/pdf";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// // import { Checkbox } from "@/components/ui/checkbox";
// import { Upload, Plus } from "lucide-react";
// import { toast } from "sonner";

// import { handleError } from "@/helpers/handle-error";

// const UploadDialog = () => {
//   const [open, setOpen] = useState(false);
//   const uploadPdfMutation = useUploadPdfs();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setSelectedFiles(Array.from(event.target.files));
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFiles.length) {
//       toast.error("Please select at least one PDF file");
//       return;
//     }
//     if (!title.trim()) {
//       toast.error("Please provide a title");
//       return;
//     }

//     const formData = new FormData();
//     selectedFiles.forEach((file) => {
//       formData.append("pdfs", file);
//     });
//     formData.append("title", title.trim());
//     if (description?.trim()) {
//       formData.append("description", description.trim());
//     }

//     uploadPdfMutation.mutate(
//       { formData },
//       {
//         onSuccess: () => {
//           toast.success("PDFs uploaded successfully");
//           setSelectedFiles([]);
//           setTitle("");
//           setDescription("");
//           setOpen(false);
//         },
//         onError: handleError,
//       }
//     );
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button>
//           <Plus className="w-4 h-4 mr-2" />
//           Upload PDFs
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>Upload PDFs</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4 mt-4">
//           <div className="space-y-2">
//             <Label htmlFor="title">Title</Label>
//             <Input
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter document title"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="description">Description (optional)</Label>
//             <Textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter document description"
//               className="h-24"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="files">Select Files</Label>
//             <Input
//               id="files"
//               ref={fileInputRef}
//               type="file"
//               accept=".pdf"
//               multiple
//               onChange={handleFileSelect}
//             />
//           </div>

//           <Button
//             className="w-full"
//             onClick={handleUpload}
//             disabled={uploadPdfMutation.isPending || !title.trim()}
//           >
//             <Upload className="w-4 h-4 mr-2" />
//             {uploadPdfMutation.isPending ? "Uploading..." : "Upload PDFs"}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };


// export di