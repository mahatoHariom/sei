"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useEnrollInSubject, useSubjects } from "@/hooks/subjects";
import { Button } from "../ui/button";
import { handleError } from "@/helpers/handle-error";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Messages } from "@/constants/messages";
import queryClient from "@/lib/query-client";
import { apiKeys } from "@/constants/apiKeys";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import {
  Clock,
  Users,
  BarChart3,
  Star,
  BookOpen,
  Award,
  Loader2,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Subject } from "@/types/subjects";

const capitalizeTitle = (title: string) => {
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Default image in case none is provided
const defaultCourseImage =
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop";

interface CoursesSectionProps {
  searchQuery?: string;
  category?: string;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  searchQuery = "",
  category = "all",
}) => {
  const { data: courses, isLoading, isError } = useSubjects();
  const { mutate: enroll, isPending: isEnrolling } = useEnrollInSubject();
  const { id: userId } = useSelector((state: RootState) => state.user);
  const token = Cookies.get("accessToken");

  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(
    null
  );
  const [filteredCourses, setFilteredCourses] = useState<Subject[]>([]);

  // Filter courses based on search query and category
  useEffect(() => {
    if (courses?.length) {
      let filtered = [...courses];

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (course) =>
            course.name.toLowerCase().includes(query) ||
            (course.description &&
              course.description.toLowerCase().includes(query))
        );
      }

      // Apply category filter
      if (category && category !== "all") {
        if (category === "popular") {
          filtered = filtered.filter(
            (course) => course.students && course.students > 100
          );
        } else if (category === "new") {
          filtered = filtered.filter((course) => course.badge === "New");
        } else if (category === "tech") {
          filtered = filtered.filter(
            (course) =>
              course.courseType === "Technology" ||
              (course.tags && course.tags.includes("Technology"))
          );
        } else if (category === "business") {
          filtered = filtered.filter(
            (course) =>
              course.courseType === "Business" ||
              (course.tags && course.tags.includes("Business")) ||
              course.name.toLowerCase().includes("business")
          );
        }
      }

      setFilteredCourses(filtered);
    }
  }, [courses, searchQuery, category]);

  const handleEnroll = (subjectId: string) => {
    if (!userId || !token) {
      toast.error(Messages.needToLogin.success);
      redirect("/login");
      return;
    } else {
      setEnrollingCourseId(subjectId);
      enroll(
        { subjectId, userId },
        {
          onError: handleError,
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [apiKeys.getAllSubjects],
            });
            toast.success(Messages.Enrolled.success);
            setEnrollingCourseId(null);
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-lg font-medium">Loading courses...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center gap-4 text-destructive">
        <p className="text-xl font-medium">Failed to load courses</p>
        <p className="text-sm">Please try again later</p>
      </div>
    );
  }

  if (filteredCourses.length === 0) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center">
        <p className="text-xl text-muted-foreground">
          No courses found matching your criteria
        </p>
        {searchQuery && (
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search query or browse all courses
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Course count */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          Showing <span className="font-medium">{filteredCourses.length}</span>{" "}
          courses
        </p>
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow overflow-hidden group">
              {/* Course image */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={course.imageUrl || defaultCourseImage}
                  alt={capitalizeTitle(course.name)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Badge if available */}
                {course.badge && (
                  <div className="absolute top-3 right-3">
                    <Badge
                      className={
                        course.badge === "New"
                          ? "bg-green-500 hover:bg-green-600"
                          : course.badge === "Featured"
                          ? "bg-amber-500 hover:bg-amber-600"
                          : course.badge === "Popular"
                          ? "bg-purple-500 hover:bg-purple-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }
                    >
                      {course.badge}
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">
                    {capitalizeTitle(course.name)}
                  </CardTitle>
                </div>
                {course.courseType && (
                  <Badge variant="outline" className="mt-1">
                    {course.courseType}
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="py-0 flex-grow">
                {course.description && (
                  <CardDescription className="line-clamp-3 mb-4">
                    {course.description}
                  </CardDescription>
                )}

                <div className="grid grid-cols-2 gap-2 text-sm mb-1">
                  {course.difficulty && (
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                      <span>{course.difficulty}</span>
                    </div>
                  )}
                  {course.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                  )}
                  {course.students !== undefined && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{course.students} students</span>
                    </div>
                  )}
                </div>

                {course.tags && course.tags.length > 0 && (
                  <ScrollArea className="h-8 whitespace-nowrap mt-3">
                    <div className="flex gap-1">
                      {course.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="mr-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>

              <CardFooter className="pt-4 mt-auto">
                <Button
                  className="w-full"
                  onClick={() => handleEnroll(course.id)}
                  disabled={isEnrolling && enrollingCourseId === course.id}
                >
                  {isEnrolling && enrollingCourseId === course.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enrolling...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Enroll Now
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
