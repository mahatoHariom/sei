"use client";

import React, { useState } from "react";
import { CoursesSection } from "@/components/courses/courses-section";
import { FAQStructuredData } from "@/components/global/seo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// SEO handling is done in metadata.ts

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  // Course categories
  const categories = [
    { id: "all", label: "All Courses" },
    { id: "popular", label: "Popular" },
    { id: "new", label: "New Courses" },
    { id: "tech", label: "Technology" },
    { id: "business", label: "Business" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <FAQStructuredData data={courseFAQs} />

      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-primary/80 to-primary py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Your Next Learning Journey
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90">
              Explore our comprehensive range of courses designed to help you
              advance your career and skills
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
              <Input
                type="text"
                placeholder="Search for courses..."
                className="pl-10 py-6 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/70 border-white/30 focus-visible:ring-white/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>

        {/* Decorative shapes */}
        <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl"></div>
      </section>

      {/* Course listing section */}
      <section className="py-12 md:py-16 container mx-auto px-4">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-3xl font-bold mb-6 md:mb-0">Explore Courses</h2>
            <TabsList className="bg-background border p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <CoursesSection
                searchQuery={searchQuery}
                category={category.id}
              />
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Benefits section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Learn With Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Instructors",
                description:
                  "Learn from industry professionals with years of practical experience",
                icon: "👨‍🏫",
              },
              {
                title: "Flexible Learning",
                description:
                  "Study at your own pace with our flexible course schedules",
                icon: "⏱️",
              },
              {
                title: "Job-Ready Skills",
                description:
                  "Gain practical skills that employers are actively seeking",
                icon: "💼",
              },
              {
                title: "Community Support",
                description:
                  "Join a community of learners and get support whenever you need it",
                icon: "🤝",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-xl border shadow-sm"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
