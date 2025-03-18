"use client";

import { useState, useEffect } from "react";
import Carousel from "../carousel";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useAdminGetAllCarousels } from "@/hooks/admin";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Carousel as CarouselType } from "@/services/admin";

// Define extended carousel item type to include title and description
interface EnhancedCarouselItem extends Partial<CarouselType> {
  id: string;
  url: string;
  title?: string;
  description?: string;
}

// Updated Unsplash images with proper URLs and credits
const FALLBACK_IMAGES: EnhancedCarouselItem[] = [
  {
    id: "fallback-1",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop",
    title: "Education Excellence",
    description: "Empowering minds through quality education",
  },
  {
    id: "fallback-2",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    title: "Learning Environment",
    description: "State-of-the-art facilities for optimal learning",
  },
  {
    id: "fallback-3",
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    title: "Student Success",
    description: "Nurturing future leaders and innovators",
  },
];

const HomeCarousel = () => {
  const [isImagesLoading, setIsImagesLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const {
    data: carousels,
    isLoading: isDataLoading,
    isError,
  } = useAdminGetAllCarousels();

  // Determine which images to use (API or fallback)
  const carouselImages: EnhancedCarouselItem[] =
    isError || !carousels?.length
      ? FALLBACK_IMAGES
      : carousels.map((carousel) => ({
          ...carousel,
          title: "Welcome to SEI Institute",
          description:
            "Empowering minds, shaping futures through quality education",
        }));

  // Check if all images are loaded
  useEffect(() => {
    if (
      Object.keys(imagesLoaded).length === carouselImages.length &&
      Object.values(imagesLoaded).every((loaded) => loaded)
    ) {
      setIsImagesLoading(false);
    }
  }, [imagesLoaded, carouselImages.length]);

  // Loading state while fetching data
  if (isDataLoading) {
    return (
      <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50">
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="mt-4 text-primary font-medium">
            Loading amazing content...
          </p>
        </div>
      </div>
    );
  }

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleImageLoad = (id: string) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] relative overflow-hidden">
      {/* Improved loader with animation */}
      {isImagesLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 z-10 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="mt-4 text-primary font-medium">
              Loading amazing content...
            </p>
          </motion.div>
        </div>
      )}

      <Carousel
        items={carouselImages.map((carousel, index) => (
          <div key={carousel.id} className="w-full h-full relative">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={carousel.url}
                alt={carousel.title || `Carousel Image ${index + 1}`}
                fill
                priority={index === 0}
                loading="eager"
                className="object-cover w-full h-full"
                sizes="100vw"
                onLoadingComplete={() => handleImageLoad(carousel.id)}
              />
            </div>

            {/* Content overlay with animation */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
              {currentSlide === index && (
                <div className="text-center text-white px-4 max-w-5xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3,
                      type: "spring",
                      stiffness: 40,
                    }}
                    className="flex flex-col items-center"
                  >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90 drop-shadow-lg">
                      {carousel.title || "Welcome to SEI Institute"}
                    </h2>
                    <p className="text-base md:text-lg mb-6 max-w-3xl mx-auto text-white/90 drop-shadow">
                      {carousel.description ||
                        "Empowering minds, shaping futures through quality education"}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/register")}
                        className="bg-primary hover:bg-primary/90 transition-all text-white text-base px-6 py-2 rounded-lg shadow-lg hover:shadow-primary/30"
                      >
                        Get Started
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/courses")}
                        className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white text-base px-6 py-2 rounded-lg border border-white/30 shadow-lg"
                      >
                        Explore Courses
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        ))}
        autoPlay={true}
        interval={6000}
        onSlideChange={handleSlideChange}
        hideIndicators={true}
      />

      {/* Custom slide indicators with animation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
        {carouselImages.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-all duration-300 focus:outline-none ${
              currentSlide === index
                ? "w-8 h-2 bg-white rounded-full"
                : "w-2 h-2 bg-white/40 hover:bg-white/60 rounded-full"
            }`}
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
