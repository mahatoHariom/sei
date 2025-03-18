"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GraduationCap, Users, Target, Award } from "lucide-react";

interface AboutSectionProps {
  hide?: boolean;
}

const stats = [
  {
    icon: <GraduationCap className="w-6 h-6" />,
    value: "5000+",
    label: "Graduates",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "100+",
    label: "Expert Instructors",
  },
  {
    icon: <Target className="w-6 h-6" />,
    value: "95%",
    label: "Success Rate",
  },
  {
    icon: <Award className="w-6 h-6" />,
    value: "50+",
    label: "Programs",
  },
];

export const AboutSection = ({ hide = false }: AboutSectionProps) => {
  const router = useRouter();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop"
                alt="SEI Institute Campus"
                fill
                className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl">
              <p className="text-2xl font-bold">15+</p>
              <p className="text-sm">Years of Excellence</p>
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2940&auto=format&fit=crop"
                alt="Education Detail"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Empowering Minds, Shaping Futures
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              At SEI Institute, we believe in the transformative power of
              education. Our commitment to excellence and innovation has made us
              a leading institution in providing quality education and
              professional development opportunities.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              With a focus on practical learning and industry-relevant
              curriculum, we prepare our students for success in their chosen
              fields. Our experienced faculty and state-of-the-art facilities
              create an environment conducive to learning and growth.
            </p>
            {!hide && (
              <Button
                size="lg"
                onClick={() => router.push("/about")}
                className="text-lg px-8 py-6"
              >
                Learn More About Us
              </Button>
            )}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-secondary/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-primary mb-2 flex justify-center">
                {stat.icon}
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
