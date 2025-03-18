import { useCourseSEO } from "@/hooks/seo";

export default function generateMetadata() {
  return useCourseSEO({
    customKeywords: [
      "SEI Institute courses",
      "bridge course programs",
      "professional certification",
      "exam preparation classes",
      "experienced teachers",
      "supportive learning environment",
      "skill development programs",
      "career advancement courses",
      "practical training",
      "hands-on learning",
    ],
  });
}
