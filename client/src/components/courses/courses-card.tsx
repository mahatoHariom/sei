/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";

interface CourseCardProps {
  title: string;
  description: string;
  level?: string; // Optional course level (e.g., Beginner, Intermediate)
  rating?: number; // Optional course rating out of 5
  icon?: string; // Optional icon URL
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  level,
  rating,
  icon,
}) => {
  return (
    <motion.div
      className="relative p-6 bg-white border rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 group"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center gap-4 mb-4">
        {icon && (
          <img
            src={icon}
            alt={`${title} Icon`}
            className="w-12 h-12 object-cover rounded-full bg-gray-100 p-2"
          />
        )}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          {level && (
            <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
              {level}
            </span>
          )}
        </div>
      </div>
      <p className="text-gray-600 group-hover:text-gray-800 transition">
        {description}
      </p>
      {rating && (
        <div className="flex items-center mt-4">
          {"⭐".repeat(rating)}{" "}
          <span className="ml-2 text-gray-500">({rating}/5)</span>
        </div>
      )}
      <button className="absolute bottom-6 right-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition">
        Enroll Now
      </button>
    </motion.div>
  );
};
