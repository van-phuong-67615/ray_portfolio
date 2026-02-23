import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nguyen Van Phuong | Front-End Developer",
  description:
    "Interactive portfolio of Nguyen Van Phuong — Front-End Developer with 3+ years experience in ReactJS, Next.js, TypeScript. Explore as a side-scrolling game adventure!",
  keywords: [
    "Front-End Developer",
    "ReactJS",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Da Nang",
    "Vietnam",
  ],
  openGraph: {
    title: "Nguyen Van Phuong | Front-End Developer",
    description:
      "Interactive portfolio — explore my skills & projects as a side-scrolling game!",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="no-select">{children}</body>
    </html>
  );
}
