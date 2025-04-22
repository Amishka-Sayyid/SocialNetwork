import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Social Network",
  description:
    "Every image tells a story — what's yours? Share moments, connect with friends, and discover new people.",
  openGraph: {
    title: "Social Network",
    description:
      "Every image tells a story — what's yours? Join the Social Network to meet new people, share posts, and engage in lively discussions.",
    type: "website",
    url: "https://social-network-wk-9.vercel.app/",
    images: ["/design1 Phone.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ResponsiveAppBar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
