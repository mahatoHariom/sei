"use client";
import CountAnimation from "../global/count-animation";
import Iconify from "../global/iconify";
import { useRef } from "react";
import useIntersectionObserver from "../../hooks/globals/use-intersection-oberservers";

const CounterDetailPage = () => {
  const counters = [
    { countTo: 50, label: "Students", duration: 2, showInK: true },
    { countTo: 50, label: "Courses", duration: 3, showInK: false },
    { countTo: 100, label: "Instructors", duration: 3, showInK: false },
  ];

  const counterRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(counterRef);

  return (
    <div
      ref={counterRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full p-6 border"
    >
      {counters.map((counter, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-1 text-center w-full col-span-1"
        >
          <span className="flex items-baseline gap-1 text-xl font-bold">
            <CountAnimation
              countTo={counter.countTo}
              duration={counter.duration}
              isVisible={isVisible} // Pass the visibility state
            />
            {counter.showInK ? (
              <span className="text-3xl font-bold flex items-center">
                K <Iconify name="ic:twotone-plus" className="text-3xl ml-1" />
              </span>
            ) : (
              <Iconify name="ic:twotone-plus" className="text-3xl ml-1" />
            )}
          </span>
          <span className="text-xl font-semibold text-gray-700 m-0 p-0 mt-2">
            {counter.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CounterDetailPage;
