"use client";

import React from "react";
import {
  generateCourseStructuredData,
  generateFAQStructuredData,
  generateOrganizationStructuredData,
  CourseStructuredDataProps,
  OrganizationStructuredDataProps,
  SEI_INSTITUTE_ORGANIZATION_DATA,
  SEI_INSTITUTE_FAQS,
} from "@/lib/structured-data";

interface StructuredDataComponentProps {
  type: "organization" | "course" | "faq" | "all";
  organizationData?: OrganizationStructuredDataProps;
  courseData?: CourseStructuredDataProps;
  faqData?: Array<{ question: string; answer: string }>;
}

/**
 * Component to inject structured data (JSON-LD) into pages
 * Can be used to add one or multiple schema types
 */
const StructuredData: React.FC<StructuredDataComponentProps> = ({
  type,
  organizationData = SEI_INSTITUTE_ORGANIZATION_DATA,
  courseData,
  faqData = SEI_INSTITUTE_FAQS,
}) => {
  // Generate the appropriate structured data based on type
  const generateHTML = () => {
    switch (type) {
      case "organization":
        return { __html: generateOrganizationStructuredData(organizationData) };
      case "course":
        if (!courseData) return { __html: "" };
        return { __html: generateCourseStructuredData(courseData) };
      case "faq":
        return { __html: generateFAQStructuredData(faqData) };
      case "all":
        let allData = generateOrganizationStructuredData(organizationData);
        if (courseData) {
          allData += generateCourseStructuredData(courseData);
        }
        allData += generateFAQStructuredData(faqData);
        return { __html: allData };
      default:
        return { __html: "" };
    }
  };

  return <div dangerouslySetInnerHTML={generateHTML()} />;
};

/**
 * Specific structured data components for common use cases
 */

export const OrganizationStructuredData: React.FC<{
  data?: OrganizationStructuredDataProps;
}> = ({ data = SEI_INSTITUTE_ORGANIZATION_DATA }) => {
  return <StructuredData type="organization" organizationData={data} />;
};

export const CourseStructuredData: React.FC<{
  data: CourseStructuredDataProps;
}> = ({ data }) => {
  return <StructuredData type="course" courseData={data} />;
};

export const FAQStructuredData: React.FC<{
  data?: Array<{ question: string; answer: string }>;
}> = ({ data = SEI_INSTITUTE_FAQS }) => {
  return <StructuredData type="faq" faqData={data} />;
};

export const HomepageStructuredData: React.FC = () => {
  return <StructuredData type="all" />;
};

export default StructuredData;
