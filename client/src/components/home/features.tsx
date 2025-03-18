"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, Users, Trophy, Clock, Target } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Comprehensive Courses",
    description:
      "Access a wide range of courses designed to meet your learning needs and career goals.",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Expert Instructors",
    description:
      "Learn from experienced professionals who are passionate about teaching and student success.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Interactive Learning",
    description:
      "Engage in dynamic learning environments with peer collaboration and real-world projects.",
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Certification",
    description:
      "Earn recognized certifications upon completion of our programs.",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Flexible Schedule",
    description: "Study at your own pace with our flexible learning options.",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Career Focused",
    description:
      "Programs designed to prepare you for success in your chosen field.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose SEI Institute?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide the tools and support you need to achieve your
            educational and professional goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
