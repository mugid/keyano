import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "keyano | music",
  description: "Piano built to record you creations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="absolute bottom-0 left-[50%] translate-x-[-50%] flex justify-center items-center mb-5">
          recorded by
          <a
            href="https://github.com/mugid"
            className="italic text-yellow-400 font-semibold hover:text-yellow-500 transition-colors duration-300 ml-1"
          >
            {" "}
            bek slambek
          </a>
        </footer>
      </body>
    </html>
  );
}
