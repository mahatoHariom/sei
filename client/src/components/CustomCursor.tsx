"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Using spring animation with better configuration for smoother cursor movement
  const springConfig = { damping: 35, stiffness: 400, mass: 0.8 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  // Dot follows cursor exactly for precision
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Update spring physics for outline (smooth follow)
      cursorX.set(clientX);
      cursorY.set(clientY);

      // Update dot position directly (exact follow)
      setDotPosition({ x: clientX, y: clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  // Additional cursor states for interactive elements
  useEffect(() => {
    const handleHoverLinks = () => {
      const links = document.querySelectorAll('a, button, [role="button"]');

      links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          document.documentElement.classList.add("cursor-hover");
        });

        link.addEventListener("mouseleave", () => {
          document.documentElement.classList.remove("cursor-hover");
        });
      });
    };

    handleHoverLinks();

    // Re-run when DOM might have changed
    const observer = new MutationObserver(handleHoverLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Exact position dot */}
      <div
        className={`cursor-dot ${isClicking ? "cursor-clicking" : ""} ${
          isVisible ? "cursor-visible" : ""
        }`}
        style={{
          transform: `translate(${dotPosition.x}px, ${dotPosition.y}px)`,
        }}
      />

      {/* Spring physics outline for smooth follow */}
      <motion.div
        className={`cursor-dot-outline ${isClicking ? "cursor-clicking" : ""} ${
          isVisible ? "cursor-visible" : ""
        }`}
        style={{
          translateX: cursorX,
          translateY: cursorY,
          scale: isClicking ? 0.8 : 1,
        }}
      />
    </>
  );
}
