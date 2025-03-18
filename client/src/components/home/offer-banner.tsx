"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tag, Clock, ChevronRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export const OfferBanner = () => {
  const router = useRouter();

  return (
    <section className="bg-background py-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary/5 via-primary/10 to-blue-500/5 rounded-xl overflow-hidden shadow-md border border-primary/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Left content */}
            <div className="md:col-span-8 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <Sparkles size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">
                  Special Offer
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                Get 30% Off on All Professional Development Courses
              </h3>

              <p className="text-muted-foreground mb-5 max-w-2xl">
                Elevate your career with our expert-led courses. Register before
                the offer expires and save 30% on any professional development
                program.
              </p>

              <div className="flex items-center gap-2 mb-6 bg-primary/5 py-1.5 px-3 rounded-full w-fit">
                <Clock size={16} className="text-primary" />
                <span className="text-sm font-medium">
                  Offer expires in 5 days
                </span>
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push("/courses/professional")}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm hover:shadow"
                >
                  Explore Courses
                  <ChevronRight size={16} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push("/register")}
                  className="flex items-center gap-2 bg-transparent border border-primary/30 text-primary px-6 py-2.5 rounded-lg font-medium hover:bg-primary/5 transition-all"
                >
                  Register Now
                </motion.button>
              </div>
            </div>

            {/* Right image */}
            <div className="hidden md:block md:col-span-4 h-full relative">
              <div className="relative h-full min-h-[220px]">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop"
                  alt="Professional development courses"
                  fill
                  className="object-cover rounded-r-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary/20 mix-blend-multiply" />

                {/* Discount Tag */}
                <div className="absolute top-4 right-4 bg-primary text-white font-bold py-2 px-4 rounded-full transform rotate-3 shadow-lg">
                  <span className="text-xl">30% OFF</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
