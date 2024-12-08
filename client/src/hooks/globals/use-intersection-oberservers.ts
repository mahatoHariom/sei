// hooks/useIntersectionObserver.ts
import { useEffect, useState } from "react";

const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  threshold: number = 0.1
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Set visible to true when in view
          observer.disconnect(); // Stop observing once it's visible
        }
      },
      { threshold } // Trigger when at least `threshold` is visible
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, threshold]);

  return isVisible;
};

export default useIntersectionObserver;
