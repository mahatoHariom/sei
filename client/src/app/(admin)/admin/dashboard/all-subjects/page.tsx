"use client";

import React, { useState } from "react";
import {
  useGetAllSubjects,
  useCreateSubject,
  useEditSubject,
  useDeleteSubject,
} from "@/hooks/admin";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Subject } from "@/types/subjects";
import SubjectsTable from "@/components/admin/subject-table";
import { CreateSubjectModal } from "@/components/admin/create-subject-modal";
import { EditSubjectModal } from "@/components/admin/edit-subject-modal";
import DeleteSubjectModal from "@/components/admin/delte-subject-modal";

const AdminDashboardAllSubjects = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [deletingSubjectId, setDeletingSubjectId] = useState<string | null>(
    null
  );

  const { data: subjects, isLoading } = useGetAllSubjects();
  const createSubjectMutation = useCreateSubject();
  const editSubjectMutation = useEditSubject();
  const { mutate: deleteSubjectMutation, isPending } = useDeleteSubject();

  const handleCreate = async (data: { name: string; description: string }) => {
    try {
      await createSubjectMutation.mutateAsync(data);
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Failed to create subject:", error);
    }
  };

  // Update the handleEdit function to accept optional description
  const handleEdit = async (data: { name: string; description?: string }) => {
    if (!selectedSubject) return;
    try {
      await editSubjectMutation.mutateAsync({
        subjectId: selectedSubject.id,
        updates: {
          name: data.name,

          description: data.description || "",
        },
      });
      setIsEditOpen(false);
      setSelectedSubject(null);
    } catch (error) {
      console.error("Failed to edit subject:", error);
    }
  };

  const openDeleteModal = (subjectId: string) => {
    setDeletingSubjectId(subjectId);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingSubjectId) return;
    try {
      await deleteSubjectMutation(deletingSubjectId);
      setIsDeleteOpen(false);
      setDeletingSubjectId(null);
    } catch (error) {
      console.error("Failed to delete subject:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Subjects</h1>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Subject
        </Button>
      </div>

      <div className="rounded-md">
        <SubjectsTable
          data={subjects || []}
          isLoading={isLoading}
          onEdit={(subject) => {
            setSelectedSubject(subject);
            setIsEditOpen(true);
          }}
          onDelete={(id) => openDeleteModal(id)}
        />
      </div>

      <CreateSubjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
      />

      <EditSubjectModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedSubject(null);
        }}
        onSubmit={handleEdit}
        subject={selectedSubject}
      />

      <DeleteSubjectModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={handleDelete}
        isDeleting={isPending}
      />
    </div>
  );
};

export default AdminDashboardAllSubjects;
