import React from "react";
import { useAdminEditContact } from "@/hooks/admin";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { FormWrapper } from "@/components/global/form-wrapper";
import { FormFieldWrapper } from "@/components/global/form-field-wrapper";
import * as z from "zod";

interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactId: string | null;
  initialName: string;
  initialPhone: string;
  initialEmail: string;
  initialMessage: string;
}

const editContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type EditContactFormData = z.infer<typeof editContactSchema>;

const EditContactModal: React.FC<EditContactModalProps> = ({
  isOpen,
  onClose,
  contactId,
  initialName,
  initialPhone,
  initialEmail,
  initialMessage,
}) => {
  const editContactMutation = useAdminEditContact();

  const handleSubmit = (data: EditContactFormData) => {
    if (contactId) {
      editContactMutation.mutate(
        {
          contactId,
          updates: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            message: data.message,
          },
        },
        {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            console.error("Failed to edit contact:", error);
          },
        }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>

        <FormWrapper
          defaultValues={{
            name: initialName,
            phone: initialPhone,
            email: initialEmail,
            message: initialMessage,
          }}
          validationSchema={editContactSchema}
          onSubmit={handleSubmit}
        >
          {({ control, isValid }) => (
            <>
              <div className="grid gap-4 py-4">
                <FormFieldWrapper
                  name="name"
                  label="Name"
                  placeholder="Enter name"
                  control={control}
                />
                <FormFieldWrapper
                  name="phone"
                  label="Phone"
                  placeholder="Enter phone number"
                  control={control}
                />
                <FormFieldWrapper
                  name="email"
                  label="Email"
                  placeholder="Enter email"
                  control={control}
                  type="email"
                />
                <FormFieldWrapper
                  name="message"
                  label="Message"
                  placeholder="Enter message"
                  control={control}
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!isValid || editContactMutation.isPending}
                  loading={editContactMutation.isPending}
                >
                  Save Changes
                </Button>
              </div>
            </>
          )}
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default EditContactModal;
