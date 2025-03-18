import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/global/theme-provider";
import { fontMontserrat } from "@/config/fonts";
import { Providers } from "@/lib/providers";
import { Toaster } from "@/components/ui/sonner";
import { GlobalModal } from "@/components/global/modal/global-modal";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "SEI Institute | Expert Bridge Courses & Exam Preparation Classes",
  description:
    "SEI Institute offers comprehensive bridge courses, exam preparation classes, and professional development programs with experienced instructors in a supportive learning environment. Join our quality education programs today.",
  keywords:
    "SEI Institute, bridge courses, exam preparation, professional development, experienced teachers, quality education, supportive environment, career preparation, certification programs",
  openGraph: {
    title: "SEI Institute | Expert Bridge Courses & Exam Preparation Classes",
    description:
      "Comprehensive bridge courses, exam preparation & professional development with experienced instructors in a supportive learning environment.",
    url: "https://seiinstitute.com",
    siteName: "SEI Institute",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SEI Institute - Leading Education Provider",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEI Institute | Expert Bridge Courses & Exam Preparation Classes",
    description:
      "Comprehensive bridge courses, exam preparation & professional development with experienced instructors.",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      suppressContentEditableWarning
    >
      <body className={`${fontMontserrat.variable} antialiased `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <GlobalModal />
            <Toaster richColors position="bottom-right" />
            <CustomCursor />
            <div className="relative flex flex-col min-h-screen">
              <main className="flex-grow">{children}</main>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
