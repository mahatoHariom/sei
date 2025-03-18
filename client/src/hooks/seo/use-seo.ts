import { Metadata } from "next";
import { generateSEIMetadata } from "@/lib/generate-metadata";

interface UseSEOProps {
  pageTitle: string;
  pageDescription?: string;
  pageUrl?: string;
  pageType?:
    | "home"
    | "about"
    | "courses"
    | "contact"
    | "blog"
    | "course-detail";
  customKeywords?: string[];
  customImage?: string;
}

/**
 * Hook to generate SEO metadata for any page in the SEI Institute website
 *
 * @param {UseSEOProps} props - SEO configuration properties
 * @returns {Metadata} Next.js metadata object
 */
export const useSEO = ({
  pageTitle,
  pageDescription,
  pageUrl,
  pageType = "home",
  customKeywords,
  customImage,
}: UseSEOProps): Metadata => {
  // Construct the path-specific URL if pageUrl is provided
  const fullUrl = pageUrl
    ? `https://seiinstitute.com${
        pageUrl.startsWith("/") ? pageUrl : `/${pageUrl}`
      }`
    : undefined;

  return generateSEIMetadata({
    title: pageTitle,
    description: pageDescription,
    canonicalUrl: fullUrl,
    pageType,
    keywords: customKeywords,
    ogImage: customImage,
  });
};

/**
 * Helper functions for specific page types
 */

export const useHomeSEO = (customProps?: Partial<UseSEOProps>): Metadata => {
  return useSEO({
    pageTitle: "Home - Expert Bridge Courses & Exam Preparation",
    pageType: "home",
    pageUrl: "/",
    ...customProps,
  });
};

export const useAboutSEO = (customProps?: Partial<UseSEOProps>): Metadata => {
  return useSEO({
    pageTitle: "About Us - Our Mission & Teaching Philosophy",
    pageDescription:
      "Learn about SEI Institute's mission, our experienced faculty, and our commitment to providing quality education in a supportive learning environment.",
    pageType: "about",
    pageUrl: "/about",
    ...customProps,
  });
};

export const useCourseSEO = (customProps?: Partial<UseSEOProps>): Metadata => {
  return useSEO({
    pageTitle: "Courses - Bridge Programs & Exam Preparation Classes",
    pageDescription:
      "Explore our comprehensive bridge courses, exam preparation classes, and professional development programs designed to help you succeed.",
    pageType: "courses",
    pageUrl: "/courses",
    ...customProps,
  });
};

export const useContactSEO = (customProps?: Partial<UseSEOProps>): Metadata => {
  return useSEO({
    pageTitle: "Contact Us - Admission Inquiries & Course Information",
    pageDescription:
      "Get in touch with SEI Institute for information about our programs, admission requirements, and to start your educational journey with us.",
    pageType: "contact",
    pageUrl: "/contact",
    ...customProps,
  });
};

export const useCourseDetailSEO = (
  courseName: string,
  courseSlug: string,
  courseDescription?: string,
  customProps?: Partial<UseSEOProps>
): Metadata => {
  return useSEO({
    pageTitle: `${courseName} - Course Details`,
    pageDescription:
      courseDescription ||
      `Learn more about our ${courseName} course, curriculum, learning outcomes, and how to enroll at SEI Institute.`,
    pageType: "course-detail",
    pageUrl: `/courses/${courseSlug}`,
    ...customProps,
  });
};
