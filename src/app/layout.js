// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import { Toast } from "@heroui/react";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Recipe Hub",
  description: "A collection of delicious recipes for every occasion.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning // <-- ADD THIS ATTRIBUTE HERE
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Toast.Provider placement="top end"
            width={380}
            gap={12}
            maxVisibleToasts={4}
            className="top-6 right-6" />
          <Navbar />
          {children}
          <Footer />
          <SmoothScroll />
        </Providers>
      </body>
    </html>
  );
}