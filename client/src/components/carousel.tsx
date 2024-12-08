"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import clsx from "clsx";
import Iconify from "./global/iconify";

interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  interval = 3000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // AutoPlay Effect
  React.useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={clsx("relative overflow-hidden w-full h-full", className)}>
      <AnimatePresence>
        {items.map(
          (item, index) =>
            index === currentIndex && (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, x: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.2, x: -100 }}
                transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }} // Smooth easing
                className="absolute inset-0 flex items-center justify-center"
              >
                {item}
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Controls */}
      <div
        className="absolute inset-y-0 left-0 flex items-center px-4 cursor-pointer"
        onClick={prevSlide}
      >
        <Iconify name="formkit:left" className="text-white" />
      </div>
      <div
        className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer"
        onClick={nextSlide}
      >
        <Iconify name="formkit:right" className="text-white" />
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={clsx(
              "w-3 h-3 rounded-full cursor-pointer",
              index === currentIndex ? "bg-white" : "bg-gray-400"
            )}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
