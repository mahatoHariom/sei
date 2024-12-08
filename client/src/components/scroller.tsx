import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollerProps {
  children: ReactNode;
  duration?: number;
}

const Scroller: React.FC<ScrollerProps> = ({ children, duration = 20 }) => {
  const childArray = React.Children.toArray(children);
  const duplicatedChildren = [...childArray, ...childArray];

  const animationVariants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="overflow-hidden whitespace-nowrap w-full relative">
      <motion.div
        className="flex gap-x-4"
        variants={animationVariants}
        animate="animate"
        style={{ width: "200%" }}
      >
        {duplicatedChildren.map((child, index) => (
          <div key={index} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Scroller;
