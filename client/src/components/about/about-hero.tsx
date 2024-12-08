/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <motion.div
      className="relative h-[60vh] md:h-[80vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?q=80&w=2920&auto=format&fit=crop"
          alt="Institute Hero"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-opacity-50"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to SEI (Scholar Educational Institute)
        </h1>
        <p className="mt-4 text-lg">
          Shaping the future through education, innovation, and research.
        </p>
      </div>
    </motion.div>
  );
};
