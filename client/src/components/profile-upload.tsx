import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUserDetail } from "@/store/slices/user-detail-slice";
import { handleError } from "@/helpers/handle-error";
import { useUpdateProfilePic } from "@/hooks/users/update-profile-pic";
import { uploadToCloudinary } from "@/helpers/upload-to-cloudinary";

interface ProfileUploadProps {
  profilePic?: {
    url: string;
  } | null;
}

const ProfileUpload = ({ profilePic }: ProfileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const { mutateAsync: updateProfilePic } = useUpdateProfilePic();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const cloudinaryData = await uploadToCloudinary(file);

      await updateProfilePic({
        url: cloudinaryData.url,
        public_id: cloudinaryData.public_id,
      }).then((res) => {
        dispatch(setUserDetail(res.data));
        toast.success("Profile picture updated successfully!");
      });
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {profilePic ? (
        <div className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-300">
          <Image
            src={profilePic.url}
            alt="Profile picture"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : (
        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
          No Image
        </div>
      )}

      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />

      <Button
        onClick={triggerFileInput}
        disabled={isUploading}
        variant="outline"
        className="w-full max-w-xs"
      >
        {isUploading ? "Uploading..." : "Update Profile Picture"}
      </Button>
    </div>
  );
};

export default ProfileUpload;
