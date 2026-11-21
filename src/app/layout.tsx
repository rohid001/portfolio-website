import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { profile } from "@/content/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata default; halaman lain cukup mengisi title, lalu template menambah nama
export const metadata: Metadata = {
  title: {
    default: `${profile.name} | Data Portfolio`,
    template: `%s | ${profile.name}`,
  },
  description: "Portfolio of Rohid: data pipelines, dashboards, and AI projects explained in plain English.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html 
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {/* Link tersembunyi untuk pengguna keyboard: langsung lompat ke konten */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow dark:focus:bg-zinc-900"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
