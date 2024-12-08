/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";

export const TeamSection = () => {
  return (
    <section className="py-16 px-6 lg:px-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
        Meet Our CEO
      </h2>
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/ceo.jpg"
          alt="CEO"
          className="w-40 h-40 rounded-full object-cover mb-4"
        />
        <h3 className="text-xl font-semibold">Angad Mahato</h3>
        <p className="">Founder & CEO</p>
        <p className="mt-4 text-center  max-w-lg">
          Angad Mahato is a visionary leader with over 20 years of experience in
          education. His mission is to create a learning environment that
          inspires students and promotes innovation.
        </p>
      </motion.div>
    </section>
  );
};
