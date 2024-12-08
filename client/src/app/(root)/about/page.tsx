"use client";

import { AboutSection } from "@/components/about/about";
import { AchievementsSection } from "@/components/about/about-achievement";
import { HeroSection } from "@/components/about/about-hero";
import { TeamSection } from "@/components/about/about-team";
import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen ">
      <HeroSection />
      <AboutSection />
      <AchievementsSection />
      <TeamSection />
    </div>
  );
};

export default AboutPage;
