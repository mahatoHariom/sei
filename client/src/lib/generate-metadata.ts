import { Metadata } from "next";

interface PageSEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  keywords?: string[];
}

export function customMetaDataGenerator({
  title,
  description = "Join the vibrant community that's bringing Nigerians together like never before...",
  canonicalUrl = "https://naijarium.vercel.app",
  //   ogType = "website",
  keywords = ["an array", "of default", "keywords"],
}: //   ogImage = "https://url-to-your-image-this-is-a-default-value-for-optional-parameter",
//   twitterCard = "summary_large_image",
PageSEOProps): Metadata {
  // Create Site Title
  const siteTitle = "SEI INSTITUTE";
  const fullTitle = `${title} | ${siteTitle}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    // openGraph: {
    //   title: fullTitle,
    //   description,
    //   type: ogType,
    //   url: canonicalUrl,
    //   images: [
    //     {
    //       url: ogImage,
    //     },
    //   ],
    // },
    // twitter: {
    //   card: twitterCard,
    //   title: fullTitle,
    //   description,
    //   images: [ogImage],
    // },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
