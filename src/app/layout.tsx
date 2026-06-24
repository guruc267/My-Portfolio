import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "K. Guru Charan — AI/ML Engineer",
  description:
    "Portfolio of K. Guru Charan — AI/ML Engineer specializing in Machine Learning, Computer Vision, and Data Analytics. Building intelligent systems that turn data into decisions.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Data Analytics",
    "Computer Vision",
    "Python",
    "Portfolio",
    "K Guru Charan",
  ],
  authors: [{ name: "K. Guru Charan" }],
  openGraph: {
    title: "K. Guru Charan — AI/ML Engineer",
    description:
      "Building intelligent systems with Machine Learning, Computer Vision, and Data Analytics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily: "'Inter', 'Geist', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
