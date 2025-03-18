import { CoursesSection } from "@/components/courses/courses-section";
import { FAQStructuredData } from "@/components/global/seo";
import React from "react";

// SEO handling is done in metadata.ts

const CoursesPage = () => {
  // Custom FAQs specifically for courses page
  const courseFAQs = [
    {
      question: "What types of bridge courses does SEI Institute offer?",
      answer:
        "SEI Institute offers a wide range of bridge courses including programming, data science, engineering, business management, and specialized technical training. Our bridge courses help students transition between different educational levels or career paths.",
    },
    {
      question:
        "How are the exam preparation classes structured at SEI Institute?",
      answer:
        "Our exam preparation classes combine comprehensive study materials, practice tests, one-on-one coaching, and small group sessions led by experienced instructors who specialize in the specific exams. We focus on test-taking strategies and mastery of key concepts.",
    },
    {
      question: "What makes SEI Institute's teaching approach different?",
      answer:
        "SEI Institute's teaching approach combines experienced instructors, a supportive learning environment, practical hands-on training, and personalized attention. Our small class sizes ensure students receive individual guidance throughout their educational journey.",
    },
    {
      question:
        "Do you offer flexible scheduling options for working professionals?",
      answer:
        "Yes, SEI Institute offers flexible scheduling options including evening classes, weekend sessions, and hybrid learning models that combine in-person and online instruction to accommodate working professionals.",
    },
    {
      question: "What career support services are available for students?",
      answer:
        "SEI Institute provides comprehensive career support including resume building, interview preparation, job placement assistance, networking opportunities, and ongoing professional development resources to help students succeed in their chosen fields.",
    },
  ];

  return (
    <div className="min-h-screen ">
      <FAQStructuredData data={courseFAQs} />
      <CoursesSection />
    </div>
  );
};

export default CoursesPage;
