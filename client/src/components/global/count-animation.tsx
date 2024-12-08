"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CountAnimationProps {
  countTo: number;
  duration?: number; // duration in seconds
  isVisible: boolean; // New prop to control visibility
}

const CountAnimation: React.FC<CountAnimationProps> = ({
  countTo,
  duration = 5,
  isVisible, // Destructure the new prop
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return; // Do nothing if not visible

    let start = 0;
    const end = countTo;
    const range = end - start;
    const stepTime = Math.abs(Math.floor((duration * 1000) / range));

    const timer = setInterval(() => {
      if (start < end) {
        start += 1; // increment by 1
        setCount(start);
      } else {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [countTo, duration, isVisible]); // Add isVisible to dependencies

  return (
    <div className="flex items-center justify-center">
      <motion.div
        key={count} // ensure it re-renders on count change
        initial={{ opacity: 1, scale: 1 }} // Start fully visible and at normal scale
        animate={{ opacity: 1, scale: 1 }} // Slightly scale up for emphasis
        exit={{ opacity: 0, scale: 0.9 }} // Scale down when exiting
        transition={{
          duration: 0.4,
          ease: [0.6, 0.05, 0.2, 0.9], // Custom cubic-bezier
        }}
        className="text-4xl font-bold text-blue-600"
      >
        {count}
      </motion.div>
    </div>
  );
};

export default CountAnimation;
