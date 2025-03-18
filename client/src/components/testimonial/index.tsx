/* eslint-disable @next/next/no-img-element */

"use client";
import React from "react";
import Scroller from "../scroller";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface Testimonial {
  userName: string;
  message: string;
  profileImage: string;
  courseType?:
    | "bridge course"
    | "exam preparation"
    | "professional development"
    | "certification";
  courseTitle?: string;
}

interface TestimonialsScrollerProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

const TestimonialsScroller: React.FC<TestimonialsScrollerProps> = ({
  testimonials,
  title = "Testimonials",
  subtitle = "What our students have to say about our bridge courses, exam preparation classes, and supportive learning environment.",
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="mb-10 mt-10">
        <h2 className="text-3xl font-bold text-center text-primary">{title}</h2>
        <p className="text-center max-w-3xl mx-auto">{subtitle}</p>
      </div>

      <Scroller>
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="flex flex-col items-center w-full max-w-sm md:max-w-md lg:max-w-lg mx-4 min-h-80 overflow-auto"
          >
            <CardHeader className="flex flex-col items-center">
              <img
                src={testimonial.profileImage}
                alt={`${testimonial.userName}'s profile - SEI Institute student`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <CardTitle>{testimonial.userName}</CardTitle>
              {testimonial.courseType && (
                <div className="text-sm text-muted-foreground">
                  {testimonial.courseType}
                  {testimonial.courseTitle
                    ? `: ${testimonial.courseTitle}`
                    : ""}
                </div>
              )}
            </CardHeader>
            <CardContent className="text-sm text-wrap text-justify">
              {testimonial.message}
            </CardContent>
          </Card>
        ))}
      </Scroller>
    </div>
  );
};

export default TestimonialsScroller;
