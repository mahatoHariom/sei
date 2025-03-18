import { Metadata } from "next";

interface PageSEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  keywords?: string[];
  pageType?:
    | "home"
    | "about"
    | "courses"
    | "contact"
    | "blog"
    | "course-detail";
}

// Default SEO values for SEI Institute
const SEI_DEFAULTS = {
  SITE_NAME: "SEI Institute",
  SITE_URL: "https://seiinstitute.com",
  DEFAULT_DESCRIPTION:
    "SEI Institute offers comprehensive bridge courses, exam preparation classes, and professional development programs with experienced instructors in a supportive learning environment.",
  DEFAULT_KEYWORDS: [
    "SEI Institute",
    "bridge courses",
    "exam preparation",
    "professional development",
    "experienced teachers",
    "quality education",
    "supportive learning environment",
    "career preparation",
    "certification programs",
    "educational institute",
  ],
  DEFAULT_OG_IMAGE: "/images/og-image.jpg",
  DEFAULT_TWITTER_IMAGE: "/images/twitter-image.jpg",
};

// Keywords by page type
const KEYWORDS_BY_PAGE = {
  home: [
    ...SEI_DEFAULTS.DEFAULT_KEYWORDS,
    "education center",
    "professional training",
    "skill development",
  ],
  about: [
    ...SEI_DEFAULTS.DEFAULT_KEYWORDS,
    "our mission",
    "teaching philosophy",
    "educational experts",
    "teaching staff",
    "educational excellence",
  ],
  courses: [
    ...SEI_DEFAULTS.DEFAULT_KEYWORDS,
    "bridge course programs",
    "exam preparation classes",
    "professional certification",
    "skill enhancement courses",
    "specialized training",
  ],
  contact: [
    ...SEI_DEFAULTS.DEFAULT_KEYWORDS,
    "contact SEI Institute",
    "admission inquiries",
    "course enrollment",
  ],
  blog: [
    ...SEI_DEFAULTS.DEFAULT_KEYWORDS,
    "education insights",
    "learning resources",
    "student success stories",
  ],
  "course-detail": [
    ...SEI_DEFAULTS.DEFAULT_KEYWORDS,
    "detailed curriculum",
    "course structure",
    "learning outcomes",
    "admission requirements",
  ],
};

export function generateSEIMetadata({
  title,
  description = SEI_DEFAULTS.DEFAULT_DESCRIPTION,
  canonicalUrl = SEI_DEFAULTS.SITE_URL,
  ogType = "website",
  ogImage = SEI_DEFAULTS.DEFAULT_OG_IMAGE,
  twitterCard = "summary_large_image",
  keywords = SEI_DEFAULTS.DEFAULT_KEYWORDS,
  pageType = "home",
}: PageSEOProps): Metadata {
  // Create Site Title
  const fullTitle = `${title} | ${SEI_DEFAULTS.SITE_NAME}`;

  // Use page-specific keywords if available
  const pageKeywords = pageType ? [...KEYWORDS_BY_PAGE[pageType]] : keywords;

  return {
    title: fullTitle,
    description,
    keywords: pageKeywords.join(", "),
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      url: canonicalUrl,
      siteName: SEI_DEFAULTS.SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SEI_DEFAULTS.SITE_NAME} - ${title}`,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
      images: [SEI_DEFAULTS.DEFAULT_TWITTER_IMAGE],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    viewport: "width=device-width, initial-scale=1",
  };
}

// Keep the old function for backward compatibility
export function customMetaDataGenerator({
  title,
  description = SEI_DEFAULTS.DEFAULT_DESCRIPTION,
  canonicalUrl = SEI_DEFAULTS.SITE_URL,
  ogType = "website",
  keywords = SEI_DEFAULTS.DEFAULT_KEYWORDS,
  ogImage = SEI_DEFAULTS.DEFAULT_OG_IMAGE,
  twitterCard = "summary_large_image",
}: PageSEOProps): Metadata {
  return generateSEIMetadata({
    title,
    description,
    canonicalUrl,
    ogType,
    ogImage,
    twitterCard,
    keywords,
  });
}
