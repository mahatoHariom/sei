"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Iconify from "./global/iconify";

interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  onSlideChange?: (index: number) => void;
  hideIndicators?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  interval = 3000,
  className = "",
  onSlideChange,
  hideIndicators = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Notify parent component when slide changes
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentIndex);
    }
  }, [currentIndex, onSlideChange]);

  // AutoPlay Effect
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length, isPaused]);

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

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      className={clsx("relative overflow-hidden w-full h-full", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {items.map(
            (item, index) =>
              index === currentIndex && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  {item}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Controls - Hide them when there's only one item */}
      {items.length > 1 && (
        <>
          <button
            className="absolute z-10 inset-y-0 left-0 flex items-center px-4 cursor-pointer bg-transparent hover:bg-black/10 transition-colors focus:outline-none"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <Iconify
              name="formkit:left"
              className="text-white drop-shadow-md w-6 h-6"
            />
          </button>
          <button
            className="absolute z-10 inset-y-0 right-0 flex items-center px-4 cursor-pointer bg-transparent hover:bg-black/10 transition-colors focus:outline-none"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <Iconify
              name="formkit:right"
              className="text-white drop-shadow-md w-6 h-6"
            />
          </button>

          {/* Indicators - Only show if not hidden */}
          {!hideIndicators && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={clsx(
                    "w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 focus:outline-none",
                    index === currentIndex
                      ? "bg-white w-8 h-2.5"
                      : "bg-white/50 hover:bg-white/80"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Carousel;
