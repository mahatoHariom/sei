"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Subject } from "@/types/subjects";
import { FormWrapper } from "@/components/global/form-wrapper";
import { FormFieldWrapper } from "@/components/global/form-field-wrapper";
import * as z from "zod";
import { toast } from "sonner";

interface EditSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description?: string }) => void;
  subject: Subject | null;
  isPending?: boolean;
}

const editSubjectSchema = z.object({
  name: z.string().min(1, "Subject name is required"),
  description: z.string().optional(),
});

type EditSubjectFormData = z.infer<typeof editSubjectSchema>;

export const EditSubjectModal = ({
  isOpen,
  onClose,
  onSubmit,
  subject,
  isPending = false,
}: EditSubjectModalProps) => {
  const handleSubmit = async (data: EditSubjectFormData) => {
    try {
      await onSubmit(data);
      toast.success("Subject updated successfully");
    } catch (error) {
      console.error("Failed to update subject:", error);
      toast.error("Failed to update subject");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Subject</DialogTitle>
        </DialogHeader>

        <FormWrapper
          defaultValues={{
            name: subject?.name || "",
            description: subject?.description || "",
          }}
          validationSchema={editSubjectSchema}
          onSubmit={handleSubmit}
        >
          {({ control, isValid }) => (
            <>
              <div className="grid gap-4 py-4">
                <FormFieldWrapper
                  name="name"
                  label="Subject Name"
                  placeholder="Enter subject name"
                  control={control}
                  disabled={isPending}
                />
                <FormFieldWrapper
                  name="description"
                  label="Description"
                  placeholder="Enter description"
                  control={control}
                  disabled={isPending}
                />
              </div>
              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!isValid || isPending}
                  loading={isPending}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </>
          )}
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};
