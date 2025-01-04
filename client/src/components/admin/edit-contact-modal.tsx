import React, { useState, useEffect } from "react";
import { useAdminEditContact } from "@/hooks/admin";
import { Dialog, DialogContent, DialogOverlay } from "../ui/dialog";

interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactId: string | null;
  initialName: string;
  initialPhone: string;
  initialEmail: string;
  initialMessage: string;
}

const EditContactModal: React.FC<EditContactModalProps> = ({
  isOpen,
  onClose,
  contactId,
  initialName,
  initialPhone,
  initialEmail,
  initialMessage,
}) => {
  const [newName, setNewName] = useState(initialName);
  const [newPhone, setNewPhone] = useState(initialPhone);
  const [newEmail, setNewEmail] = useState(initialEmail);
  const [newMessage, setNewMessage] = useState(initialMessage);
  const editContactMutation = useAdminEditContact();

  useEffect(() => {
    setNewName(initialName);
    setNewPhone(initialPhone);
    setNewEmail(initialEmail);
    setNewMessage(initialMessage);
  }, [initialName, initialPhone, initialEmail, initialMessage]);

  const handleEdit = () => {
    if (contactId) {
      editContactMutation.mutate(
        {
          contactId,
          updates: {
            name: newName,
            phone: newPhone,
            email: newEmail,
            message: newMessage,
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
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
      <DialogContent
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
        aria-labelledby="edit-modal-title"
      >
        <h2
          id="edit-modal-title"
          className="text-xl font-bold text-gray-800 mb-4"
        >
          Edit Contact
        </h2>
        <div className="mb-6">
          <label htmlFor="contact-name" className="block text-gray-600 mb-2">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Enter new name"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="contact-phone" className="block text-gray-600 mb-2">
            Phone
          </label>
          <input
            id="contact-phone"
            type="text"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Enter new phone number"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="contact-email" className="block text-gray-600 mb-2">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Enter new email"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="contact-message" className="block text-gray-600 mb-2">
            Message
          </label>
          <textarea
            id="contact-message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Enter new message"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleEdit}
            disabled={editContactMutation.isPending}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {editContactMutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditContactModal;
