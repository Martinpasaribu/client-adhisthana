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
  description:"Experience tranquility at Adhisthana Villas, a luxury retreat near Borobudur. Blending Javanese heritage with modern elegance, our villa offers a peaceful escape in nature.",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "https://adhisthanavillas.com/favicon-24x24.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "https://adhisthanavillas.com/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "64x64",
      url: "https://adhisthanavillas.com/favicon-64x64.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  ],
  keywords: "Adhisthana Villas, Villa mewah di Yogyakarta, Penginapan eksklusif Yogyakarta, Resort terbaik di Yogyakarta, Sewa villa private",
  openGraph: {
    title: "Adhisthana Villas",
    description: "Nikmati pengalaman menginap terbaik di Adhisthana Villas.",
    url: "https://adhisthanavillas.com",
    siteName: "Adhisthana Villas",
    images: [
      {
        url: "https://adhisthanavillas.com/og2-image.jpg",
        width: 1200,
        height: 630,
        alt: "Adhisthana Villas",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adhisthana Villas",
    description: "Nikmati pengalaman menginap terbaik di Adhisthana Villas.",
    images: ["https://adhisthanavillas.com/og2-image.jpg"],
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