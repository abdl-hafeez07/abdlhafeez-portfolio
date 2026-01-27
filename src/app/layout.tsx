import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import Noise from "@/components/ui/Noise";
import Preloader from "@/components/ui/Preloader";
import { PreloaderProvider } from "@/components/ui/PreloaderContext";

export const metadata = {
  title: "Abdul Hafeez — Creative Developer",
  description:
    "Creative Developer specializing in modern, animated web experiences.",
  openGraph: {
    title: "Abdul Hafeez Portfolio",
    description: "High-end animated portfolio website",
    url: "https://yourdomain.com",
    siteName: "Abdul Hafeez",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <PreloaderProvider>
          <Preloader />
          <CustomCursor />
          <Noise />
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
        </PreloaderProvider>
      </body>
    </html>
  );
}
