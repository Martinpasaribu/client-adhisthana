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
  keywords: "Adhisthana Villas, Villa mewah di Yogyakarta, Penginapan eksklusif Yogyakarta, Resort terbaik di Yogyakarta, Sewa villa private"
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