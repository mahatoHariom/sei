"use client";
import { AboutSection } from "@/components/about/about";
import { AchievementsSection } from "@/components/about/about-achievement";
import { TeamSection } from "@/components/about/about-team";
// import CounterDetailPage from "@/components/home/counter-details";
import HomeCarousel from "@/components/home/home-carousel";
import TestimonialsScroller from "@/components/testimonial";

export default function Home() {
  const testimonials = [
    {
      userName: "Hariom  Doe",
      message:
        "This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      userName: "Prakash Smith",
      message:
        "This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      userName: "Santosh Smith",
      message:
        "This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      userName: "Ashik   Smith",
      message:
        "This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      userName: "Dileep Smith",
      message:
        "This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      userName: "Sarah Smith",
      message:
        "This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      userName: "Teronvau Smith",
      message:
        "This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      userName: "Mero bau Smith",
      message:
        "This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      userName: "Ta ja Smith",
      message:
        "This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      userName: "Ta aa Smith",
      message:
        "This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      userName: "Tero mero Smith",
      message:
        "This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      userName: "hero Smith",
      message:
        "This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      userName: "Johny Smith",
      message:
        "This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!This product changed my life!",
      profileImage: "https://via.placeholder.com/50",
    },
  ];
  return (
    <main className="flex flex-col gap-10">
      <HomeCarousel />
      <AboutSection hide />
      <AchievementsSection />
      <TeamSection />
      {/* <CounterDetailPage /> */}
      <TestimonialsScroller testimonials={testimonials} />
    </main>
  );
  //
}
