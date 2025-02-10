import type { Metadata } from "next";
import localFont from "next/font/local";

import "@style/globals.css";
import "@style/style.css";

import { Toaster } from "react-hot-toast";
import ClientProvider from "./Provider/ClientProvider/page";
import Script from "next/script";

const geistSans = localFont({
  src: "../style/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../style/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Adhisthana Villas",
  description:
    "Experience tranquility at Adhisthana Villas, a luxury retreat near Borobudur. Blending Javanese heritage with modern elegance, our villa offers a peaceful escape in nature.",
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      sizes: "16x16",
      url: "/favicon-16x16.ico",
    },
    {
      rel: "icon",
      type: "image/x-icon",
      sizes: "32x32",
      url: "/favicon-32x32.ico",
    },
    {
      rel: "icon",
      type: "image/x-icon",
      sizes: "64x64",
      url: "/favicon-64x64.ico",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  ],
  openGraph: {
    title: "Adhisthana Villas",
    description:
      "Experience tranquility at Adhisthana Villas, a luxury retreat near Borobudur. Blending Javanese heritage with modern elegance, our villa offers a peaceful escape in nature.",
    url: "https://adhisthanavillas.com",
    siteName: "Adhisthana Villas",
    images: [
      {
        url: "/meta-image.png",
        width: 1200,
        height: 630,
        alt: "Adhisthana Villas Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adhisthana Villas",
    description:
      "Experience tranquility at Adhisthana Villas, a luxury retreat near Borobudur.",
    images: ["/meta-image.png"],
  },
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
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YGXWFC4JJN"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YGXWFC4JJN');
          `}
        </Script>

        <Toaster position="top-center" />

        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}