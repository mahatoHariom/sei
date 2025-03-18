"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Trophy, Medal, Target } from "lucide-react";

const achievements = [
  {
    icon: <Award className="w-8 h-8" />,
    title: "Excellence in Education",
    description:
      "Recognized as one of the top educational institutions in the region for academic excellence and innovation.",
    // year: "2023",
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Best Learning Platform",
    description:
      "Awarded for providing outstanding online learning experiences and student support services.",
    // year: "2022",
  },
  {
    icon: <Medal className="w-8 h-8" />,
    title: "Student Success Rate",
    description:
      "Achieved a remarkable 95% student success rate in professional certifications and placements.",
    // year: "2023",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Industry Partnerships",
    description:
      "Established strategic partnerships with leading companies for student internships and placements.",
    // year: "2023",
  },
];

export const AchievementsSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating our milestones and recognition in the field of education
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-primary mb-4">{achievement.icon}</div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{achievement.title}</h3>
                {/* <span className="text-sm text-muted-foreground">
                  {achievement.year}
                </span> */}
              </div>
              <p className="text-muted-foreground">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
