"use client";

import React from "react";

export const AboutSection = ({ hide }: { hide?: boolean }) => {
  return (
    <section className="py-16 px-6 lg:px-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
        About Us
      </h2>
      <p className="max-w-3xl mx-auto text-center text-lg mb-12">
        SEI Institute is committed to fostering a community of learners
        dedicated to personal growth, academic excellence, and professional
        success. With a rich history and a forward-thinking approach, we strive
        to empower individuals to achieve their dreams.
      </p>

      {!hide && (
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Our Mission",
              text: "To provide world-class education that inspires and equips students to make a meaningful impact in their communities and beyond.",
            },
            {
              title: "Our Vision",
              text: "To be a global leader in education and research, shaping a brighter future through innovation, collaboration, and inclusivity.",
            },
            {
              title: "Our Values",
              text: (
                <ul className="list-disc list-inside ">
                  <li>Integrity</li>
                  <li>Excellence</li>
                  <li>Innovation</li>
                  <li>Inclusivity</li>
                </ul>
              ),
            },
          ].map(({ title, text }, index) => (
            <div
              key={index}
              className="p-8  rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4 ">{title}</h3>
              <p className="text-lg ">{text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
