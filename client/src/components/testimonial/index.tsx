/* eslint-disable @next/next/no-img-element */

"use client";
import React from "react";
import Scroller from "../scroller";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface Testimonial {
  userName: string;
  message: string;
  profileImage: string;
}

interface TestimonialsScrollerProps {
  testimonials: Testimonial[];
}

const TestimonialsScroller: React.FC<TestimonialsScrollerProps> = ({
  testimonials,
}) => {
  return (
    <div className="flex flex-col gap-3 ">
      <div className="mb-10 mt-10">
        <h1 className="text-3xl font-bold text-center text-primary  ">
          Testimonials
        </h1>
        <h6 className="text-center">What our students have to say about us.</h6>
      </div>

      <Scroller>
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="flex flex-col items-center w-full max-w-sm md:max-w-md lg:max-w-lg mx-4   min-h-80 overflow-auto"
          >
            <CardHeader className="flex flex-col items-center ">
              <img
                src={testimonial.profileImage}
                alt={`${testimonial.userName}'s profile`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <CardTitle>{testimonial.userName}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm  text-wrap text-justify">
              {testimonial.message}
            </CardContent>
          </Card>
        ))}
      </Scroller>
    </div>
  );
};

export default TestimonialsScroller;
