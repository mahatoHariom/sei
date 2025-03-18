"use client";

import { useState, useEffect } from "react";
import Carousel from "../carousel";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useAdminGetAllCarousels } from "@/hooks/admin";

const HomeCarousel = () => {
  const [isImagesLoading, setIsImagesLoading] = useState(true);
  const {
    data: carousels,
    isLoading: isDataLoading,
    isError,
  } = useAdminGetAllCarousels();

  // Reset loading state when carousels data changes
  useEffect(() => {
    if (carousels?.length) {
      setIsImagesLoading(true);
    }
  }, [carousels]);

  // Loading state while fetching data
  if (isDataLoading) {
    return (
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  // Error or no data state
  if (isError || !carousels?.length) {
    return (
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:w-screen lg:h-[calc(100vh-64px)] relative">
      {/* Show loader while images are loading */}
      {isImagesLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
        </div>
      )}

      <Carousel
        items={carousels.map((carousel, index) => (
          <div key={carousel.id} className="w-full h-full relative">
            <Image
              src={carousel.url}
              alt={`Carousel Image ${index + 1}`}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover"
              onLoadingComplete={() => {
                if (index === carousels.length - 1) {
                  setIsImagesLoading(false);
                }
              }}
              sizes="(max-width: 640px) 100vw,
                     (max-width: 768px) 100vw,
                     (max-width: 1024px) 100vw,
                     100vw"
            />
          </div>
        ))}
        autoPlay={true}
        interval={3000}
      />
    </div>
  );
};

export default HomeCarousel;
