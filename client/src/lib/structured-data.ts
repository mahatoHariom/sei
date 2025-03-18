/**
 * Schema.org structured data utility functions for SEO
 * These functions generate JSON-LD markup that search engines use to better understand page content
 */

export interface CourseStructuredDataProps {
  name: string;
  description: string;
  provider: string;
  url: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  price?: number;
  priceCurrency?: string;
}

export interface OrganizationStructuredDataProps {
  name: string;
  description: string;
  url: string;
  logo: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[]; // Social media profiles
}

/**
 * Generates Course structured data (JSON-LD)
 */
export const generateCourseStructuredData = (
  props: CourseStructuredDataProps
): string => {
  const {
    name,
    description,
    provider,
    url,
    imageUrl,
    startDate,
    endDate,
    duration,
    price,
    priceCurrency = "USD",
  } = props;

  const courseData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
      sameAs: "https://seiinstitute.com",
    },
    url,
    ...(imageUrl && { image: imageUrl }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    ...(duration && { timeRequired: duration }),
    ...(price !== undefined && {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency,
      },
    }),
  };

  return `<script type="application/ld+json">${JSON.stringify(
    courseData
  )}</script>`;
};

/**
 * Generates Organization structured data (JSON-LD) for SEI Institute
 */
export const generateOrganizationStructuredData = (
  props: OrganizationStructuredDataProps
): string => {
  const { name, description, url, logo, address, contactPoint, sameAs } = props;

  const orgData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name,
    description,
    url,
    logo,
    ...(address && {
      address: {
        "@type": "PostalAddress",
        ...address,
      },
    }),
    ...(contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        ...contactPoint,
      },
    }),
    ...(sameAs && { sameAs }),
  };

  return `<script type="application/ld+json">${JSON.stringify(
    orgData
  )}</script>`;
};

/**
 * Generates FAQPage structured data (JSON-LD)
 */
export const generateFAQStructuredData = (
  faqs: Array<{ question: string; answer: string }>
): string => {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return `<script type="application/ld+json">${JSON.stringify(
    faqData
  )}</script>`;
};

/**
 * Default SEI Institute Organization Structured Data
 */
export const SEI_INSTITUTE_ORGANIZATION_DATA: OrganizationStructuredDataProps =
  {
    name: "SEI Institute",
    description:
      "SEI Institute offers comprehensive bridge courses, exam preparation classes, and professional development programs with experienced instructors in a supportive learning environment.",
    url: "https://seiinstitute.com",
    logo: "https://seiinstitute.com/images/logo.png",
    address: {
      streetAddress: "123 Education Street",
      addressLocality: "Education City",
      addressRegion: "ED",
      postalCode: "12345",
      addressCountry: "United States",
    },
    contactPoint: {
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      email: "info@seiinstitute.com",
    },
    sameAs: [
      "https://facebook.com/seiinstitute",
      "https://twitter.com/seiinstitute",
      "https://linkedin.com/company/sei-institute",
      "https://instagram.com/seiinstitute",
    ],
  };

/**
 * Common FAQs for SEI Institute
 */
export const SEI_INSTITUTE_FAQS = [
  {
    question: "What bridge courses does SEI Institute offer?",
    answer:
      "SEI Institute offers a comprehensive range of bridge courses including programming, data science, engineering, and business management to help students transition between different educational levels or career paths.",
  },
  {
    question: "How experienced are the teachers at SEI Institute?",
    answer:
      "Our instructors at SEI Institute have extensive industry experience and academic credentials, with an average of 10+ years in their respective fields, ensuring students receive high-quality education from real-world practitioners.",
  },
  {
    question: "What makes the learning environment at SEI Institute special?",
    answer:
      "SEI Institute provides a supportive learning environment with small class sizes, personalized attention, modern facilities, and a collaborative atmosphere that promotes active learning and student success.",
  },
  {
    question: "Does SEI Institute offer exam preparation classes?",
    answer:
      "Yes, SEI Institute offers specialized exam preparation classes for various professional certifications and standardized tests, with tailored study materials and expert guidance to maximize your chances of success.",
  },
  {
    question: "What career support services does SEI Institute provide?",
    answer:
      "SEI Institute offers comprehensive career support including resume building, interview preparation, job placement assistance, networking opportunities, and ongoing professional development resources for all students and alumni.",
  },
];
