"use client";

import React from "react";
import { motion } from "framer-motion";
import { useEnrollInSubject, useSubjects } from "@/hooks/subjects";
import { SubjectResponse } from "@/types/subjects";
import { Button } from "../ui/button";
import { handleError } from "@/helpers/handle-error";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Messages } from "@/constants/messages";
import queryClient from "@/lib/query-client";
import { apiKeys } from "@/constants/apiKeys";

const capitalizeTitle = (title: string) => {
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const CoursesSection = () => {
  const { data: courses, isLoading, isError } = useSubjects();
  const { mutate: enroll } = useEnrollInSubject();
  const { id: userId } = useSelector((state: RootState) => state.user);
  if (isLoading) {
    return <p className="text-center text-lg">Loading courses...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-lg text-red-500">
        Failed to load courses.
      </p>
    );
  }

  const handleEnroll = (subjectId: string) => {
    enroll(
      { subjectId, userId },
      {
        onError: handleError,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [apiKeys.getAllSubjects],
          });
          toast.success(Messages.Enrolled.success);
        },
      }
    );
  };

  return (
    <div className="py-16 px-6 lg:px-16">
      <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12">
        Courses We Offer
      </h2>

      {/* Render courses as cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses?.map((course: SubjectResponse, index: number) => (
          <motion.div
            key={index}
            className="relative p-6 border rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Course Content Section */}
            <div className="flex-grow mb-4">
              <h4 className="text-xl font-semibold mb-2">
                {capitalizeTitle(course.name)}
              </h4>
              <p>{course.description}</p>
            </div>

            {/* Button Section */}
            <Button
              variant={"destructive"}
              onClick={() => handleEnroll(course.id)}
              disabled={!!course.users?.find((user) => user.userId === userId)}
            >
              {course.users?.find((user) => user.userId === userId)
                ? "Already Enrolled"
                : "Enroll Now"}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
