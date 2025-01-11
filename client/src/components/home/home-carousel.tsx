"use client";
// import { useEffect } from "react";
import Carousel from "../carousel";
import Image from "next/image";
// import { useGetAllCarousels } from "@/hooks/admin"; // Assuming you'll create this hook
import { Loader2 } from "lucide-react";
import { useAdminGetAllCarousels } from "@/hooks/admin";

const HomeCarousel = () => {
  const { data: carousels, isLoading, isError } = useAdminGetAllCarousels();

  if (isLoading) {
    return (
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isError || !carousels?.length) {
    return null; // Or show a fallback image/message
  }

  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:w-screen lg:h-[calc(100vh-64px)] relative">
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
