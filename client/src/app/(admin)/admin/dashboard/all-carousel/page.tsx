/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Loader2, Pencil } from "lucide-react";
import {
  useAdminGetAllCarousels,
  useAdminDeleteCarousel,
  useAdminCreateCarousel,
  useAdminUpdateCarousel,
} from "@/hooks/admin";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/helpers/upload-to-cloudinary";
import { Carousel } from "@/services/admin";

const AdminDashboardAllCarousel = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateFileInputRef = useRef<HTMLInputElement>(null);

  const { data, isError, error, isLoading } = useAdminGetAllCarousels();
  const deleteCarouselMutation = useAdminDeleteCarousel();
  const createCarouselMutation = useAdminCreateCarousel();
  const updateCarouselMutation = useAdminUpdateCarousel();

  const handleDelete = async (id: string) => {
    try {
      await deleteCarouselMutation.mutateAsync(id);
      toast.success("Carousel deleted successfully!");
    } catch {
      toast.error("Failed to delete carousel");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const cloudinaryData = await uploadToCloudinary(file);

      await createCarouselMutation.mutateAsync({
        url: cloudinaryData.url,
        publicId: cloudinaryData.public_id,
      });

      toast.success("Carousel created successfully!");
    } catch {
      toast.error("Failed to upload carousel");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUpdate = async (
    e: React.ChangeEvent<HTMLInputElement>,
    carousel: Carousel
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const cloudinaryData = await uploadToCloudinary(file);

      await updateCarouselMutation.mutateAsync({
        id: carousel.id,
        url: cloudinaryData.url,
        publicId: cloudinaryData.public_id,
      });

      toast.success("Carousel updated successfully!");
      setUpdatingId(null);
    } catch {
      toast.error("Failed to update carousel");
    } finally {
      setIsUploading(false);
      if (updateFileInputRef.current) {
        updateFileInputRef.current.value = "";
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="ml-2">Loading carousels...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Admin - All Carousels</CardTitle>
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add New Carousel
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Public ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length ? (
              data.map((carousel) => (
                <TableRow key={carousel.id}>
                  <TableCell>{carousel.id}</TableCell>
                  <TableCell>{carousel.publicId}</TableCell>
                  <TableCell>
                    <img
                      src={carousel.url}
                      alt="Carousel"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={updateFileInputRef}
                        className="hidden"
                        onChange={(e) => handleUpdate(e, carousel)}
                        accept="image/*"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setUpdatingId(carousel.id);
                          updateFileInputRef.current?.click();
                        }}
                        disabled={isUploading}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(carousel.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No carousels available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminDashboardAllCarousel;
