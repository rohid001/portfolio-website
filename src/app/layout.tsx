import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata dasar semua halaman. Tiap halaman menambah judul, canonical, dan Open Graph lewat createMetadata.
export const metadata: Metadata = {
  // Alamat utama website: dasar untuk semua URL relatif (canonical, og:url, og:image)
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${profile.name}`,
  },
  description: site.description,
  // Kartu besar bergambar saat link dibagikan di X/Twitter
  twitter: { card: "summary_large_image" },
  // Tag verifikasi Google Search Console, hanya dipasang bila kodenya sudah diisi
  verification: site.googleSiteVerification ? { google: site.googleSiteVerification }: undefined,
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
