import React from "react";
import { useAdminDeleteContact } from "@/hooks/admin";
import { Dialog, DialogContent, DialogOverlay } from "../ui/dialog";

interface DeleteContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactId: string | null;
}

const DeleteContactModal: React.FC<DeleteContactModalProps> = ({
  isOpen,
  onClose,
  contactId,
}) => {
  const deleteContactMutation = useAdminDeleteContact();

  const handleDelete = () => {
    if (contactId) {
      deleteContactMutation.mutate(contactId, {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error("Failed to delete contact:", error);
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
      <DialogContent
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
        aria-labelledby="delete-modal-title"
      >
        <h2
          id="delete-modal-title"
          className="text-xl font-bold text-gray-800 mb-4"
        >
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this contact? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteContactMutation.isPending}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            {deleteContactMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteContactModal;
