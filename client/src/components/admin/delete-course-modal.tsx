import React from "react";
import { Dialog, DialogContent, DialogOverlay } from "../ui/dialog";

interface DeleteCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  isDeleting,
}) => {
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
          Are you sure you want to delete this course? This action cannot be
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
            onClick={onDelete}
            disabled={isDeleting}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCourseModal;
