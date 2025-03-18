"use client";

import React, { useState } from "react";
import {
  useGetAllSubjects,
  usecreateCourse,
  useeditCourse,
  usedeleteCourse,
} from "@/hooks/admin";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Subject } from "@/types/subjects";
import SubjectsTable from "@/components/admin/subject-table";
import { CreateSubjectModal } from "@/components/admin/create-subject-modal";
import { EditSubjectModal } from "@/components/admin/edit-subject-modal";
import DeleteCourseModal from "@/components/admin/delete-course-modal";
import { toast } from "sonner";

const AdminDashboardAllSubjects = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [deletingSubjectId, setDeletingSubjectId] = useState<string | null>(
    null
  );

  const { data: subjects, isLoading } = useGetAllSubjects();
  const createSubjectMutation = usecreateCourse();
  const editSubjectMutation = useeditCourse();
  const { mutate: deleteSubjectMutation, isPending } = usedeleteCourse();

  const handleCreate = async (data: Partial<Subject>) => {
    if (!data.name) {
      toast.error("Course name is required");
      return;
    }

    try {
      await createSubjectMutation.mutateAsync(data);
      setIsCreateOpen(false);
      toast.success("Course created successfully");
    } catch (error) {
      console.error("Failed to create course:", error);
      toast.error("Failed to create course");
    }
  };

  const handleEdit = async (data: Partial<Subject>) => {
    if (!selectedSubject) return;

    if (!data.name) {
      toast.error("Course name is required");
      return;
    }

    try {
      await editSubjectMutation.mutateAsync({
        courseId: selectedSubject.id,
        updates: data,
      });
      setIsEditOpen(false);
      setSelectedSubject(null);
      toast.success("Course updated successfully");
    } catch (error) {
      console.error("Failed to edit course:", error);
      toast.error("Failed to update course");
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
      toast.success("Course deleted successfully");
    } catch (error) {
      console.error("Failed to delete course:", error);
      toast.error("Failed to delete course");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Courses</h1>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Course
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

      <DeleteCourseModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={handleDelete}
        isDeleting={isPending}
      />
    </div>
  );
};

export default AdminDashboardAllSubjects;
