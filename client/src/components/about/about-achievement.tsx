"use client";

import React from "react";

export const AchievementsSection = () => {
  const achievements = [
    { number: "7000+", description: "Graduates" },
    { number: "20+", description: "Faculty Members" },
    { number: "11+", description: "Years of Excellence" },
    { number: "50+", description: "Programs Offered" },
  ];

  return (
    <section className="py-16 px-6 lg:px-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
        Achievements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {achievements.map((item, index) => (
          <div key={index}>
            <h3 className="text-2xl font-bold text-primary">{item.number}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
