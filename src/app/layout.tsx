import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "Wisemancer — Xavier Rivas",
  description:
    "Senior Backend Developer & technical leader. 14 years building distributed systems across fintech, pharma, real estate, and eCommerce.",
  openGraph: {
    title: "Wisemancer — Xavier Rivas",
    description: "Senior Backend Developer & technical leader. 14 years. TypeScript · MySQL · C# · Node.js",
    images: [{ url: "/assets/wisemancer-portrait.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${pressStart2P.variable} ${vt323.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
