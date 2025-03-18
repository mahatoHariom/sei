"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useEnrollInSubject, useSubjects } from "@/hooks/subjects";
// import { SubjectRespons } from "@/types/subjects";
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
import { SubjectsResponse } from "@/services/admin";

const capitalizeTitle = (title: string) => {
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Course difficulty levels
const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

// Course duration ranges
const durations = ["4 weeks", "8 weeks", "12 weeks", "16 weeks"];

// Generate random ratings between 4 and 5
const generateRating = () => (Math.random() * (5 - 4) + 4).toFixed(1);

// Course images from Unsplash
const courseImages = [
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop",
];

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
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [enhancedCourses, setEnhancedCourses] = useState<any[]>([]);

  // Enhance courses with additional properties
  useEffect(() => {
    if (courses?.length) {
      const enhanced = courses.map(
        (course: SubjectsResponse, index: number) => ({
          ...course,
          difficulty:
            difficultyLevels[
              Math.floor(Math.random() * difficultyLevels.length)
            ],
          duration: durations[Math.floor(Math.random() * durations.length)],
          rating: generateRating(),
          students: Math.floor(Math.random() * 500) + 50,
          image: courseImages[index % courseImages.length],
          isFeatured: Math.random() > 0.7,
          isNew: Math.random() > 0.8,
          tags: ["Technology", "Education", "Programming"].slice(
            0,
            Math.floor(Math.random() * 3) + 1
          ),
        })
      );
      setEnhancedCourses(enhanced);
    }
  }, [courses]);

  // Filter courses based on search query and category
  useEffect(() => {
    if (enhancedCourses?.length) {
      let filtered = [...enhancedCourses];

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
            (course) => parseFloat(course.rating) >= 4.5
          );
        } else if (category === "new") {
          filtered = filtered.filter((course) => course.isNew);
        } else if (category === "tech") {
          filtered = filtered.filter(
            (course) =>
              course.tags.includes("Technology") ||
              course.tags.includes("Programming")
          );
        } else if (category === "business") {
          filtered = filtered.filter(
            (course) =>
              course.name.toLowerCase().includes("management") ||
              course.name.toLowerCase().includes("business")
          );
        }
      }

      setFilteredCourses(filtered);
    }
  }, [enhancedCourses, searchQuery, category]);

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
                  src={course.image}
                  alt={capitalizeTitle(course.name)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Featured or New badge */}
                {(course.isFeatured || course.isNew) && (
                  <div className="absolute top-3 right-3">
                    {course.isNew && (
                      <Badge className="bg-green-500 hover:bg-green-600 mr-2">
                        New
                      </Badge>
                    )}
                    {course.isFeatured && (
                      <Badge className="bg-amber-500 hover:bg-amber-600">
                        Featured
                      </Badge>
                    )}
                  </div>
                )}

                {/* Difficulty badge */}
                <div className="absolute bottom-3 left-3">
                  <Badge
                    variant="secondary"
                    className="bg-black/60 hover:bg-black/70 text-white backdrop-blur-sm"
                  >
                    {course.difficulty}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">
                    {capitalizeTitle(course.name)}
                  </CardTitle>
                  <div className="flex items-center text-yellow-500">
                    <Star className="fill-current w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <CardDescription className="line-clamp-2 h-10">
                  {course.description ||
                    "Learn essential skills and concepts in this comprehensive course"}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-4 flex-grow">
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>{Math.floor(Math.random() * 20) + 5} lessons</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    <span>{course.difficulty}</span>
                  </div>
                </div>

                {/* Course tags */}
                <ScrollArea className="h-6 mt-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    {course.tags.map((tag: string, tagIndex: number) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="pt-2 border-t mt-auto">
                <Button
                  className="w-full"
                  variant={
                    course.users?.find(
                      (user: { userId: string }) => user.userId === userId
                    )
                      ? "outline"
                      : "default"
                  }
                  onClick={() => handleEnroll(course.id)}
                  disabled={
                    !!course.users?.find(
                      (user: { userId: string }) => user.userId === userId
                    ) || enrollingCourseId === course.id
                  }
                >
                  {enrollingCourseId === course.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enrolling...
                    </>
                  ) : course.users?.find(
                      (user: { userId: string }) => user.userId === userId
                    ) ? (
                    <>
                      <Award className="w-4 h-4 mr-2" />
                      Already Enrolled
                    </>
                  ) : (
                    "Enroll Now"
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
