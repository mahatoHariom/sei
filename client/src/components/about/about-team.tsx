/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Twitter, Mail } from "lucide-react";

const team = [
  {
    name: "Dr. Sarah Johnson",
    role: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
    bio: "With over 20 years of experience in education and technology, Dr. Johnson has been instrumental in shaping SEI Institute's vision and growth. She holds a Ph.D. in Educational Technology and has led numerous initiatives in digital learning transformation.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "sarah.johnson@sei.edu",
    },
  },
];

export const TeamSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Leadership
          </h2>
        </motion.div>

        {/* CEO Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary/5 rounded-lg p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2787&auto=format&fit=crop"
                alt="Dr. Sarah Johnson - CEO Spotlight"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">
                A Message from Our CEO
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                "At SEI Institute, we believe in the power of education to
                transform lives. Our commitment to excellence, innovation, and
                student success drives everything we do. We're proud to be at
                the forefront of educational technology and look forward to
                continuing our mission of empowering learners worldwide."
              </p>
              <div className="flex gap-4">
                <a
                  href={team[0].social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href={team[0].social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
