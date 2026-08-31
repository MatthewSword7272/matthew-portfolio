import type { Metadata } from "next";
import { Red_Hat_Text, Geist } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const redHat = Red_Hat_Text({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-red-hat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://matthewcatalfamoportfolio.netlify.app"),
  title: {
    default: "Matthew Catalfamo — Full-Stack Developer",
    template: "%s | Matthew Catalfamo",
  },
  description:
    "Melbourne-based full-stack developer building seamless, responsive, scalable web applications across the front end and back end.",
  openGraph: {
    title: "Matthew Catalfamo — Full-Stack Developer",
    description:
      "Melbourne-based full-stack developer building seamless, responsive, scalable web applications across the front end and back end.",
    url: "https://matthewcatalfamoportfolio.netlify.app",
    siteName: "Matthew Catalfamo",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={redHat.variable}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
