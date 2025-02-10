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
  icons: {
    icon: "/favicon.ico", // Favicon utama
    apple: "/short.ico", // Untuk Apple devices
  },
  openGraph: {
    title: "Adhisthana Villas",
    description:
      "Experience tranquility at Adhisthana Villas, a luxury retreat near Borobudur. Blending Javanese heritage with modern elegance, our villa offers a peaceful escape in nature.",
    url: "https://adhisthanavillas.com",
    siteName: "Adhisthana Villas",
    images: [
      {
        url: "/meta-image.png", // Gambar pratinjau (1200x630 px)
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
      <head>
        <title>Adhisthana Villas</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://adhisthanahotel.com/wp-content/themes/Alaric/favicon.ico"
        />
        <link rel="apple-touch-icon" href="/short.ico" />

        {/* Open Graph Meta Tags (Backup untuk yang tidak mendukung Next.js metadata) */}
        <meta property="og:title" content="Adhisthana Villas" />
        <meta
          property="og:description"
          content="Experience tranquility at Adhisthana Villas, a luxury retreat near Borobudur."
        />
        <meta property="og:image" content="/meta-image.png" />
        <meta property="og:url" content="https://adhisthanavillas.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Adhisthana Villas" />
        <meta
          name="twitter:description"
          content="Experience tranquility at Adhisthana Villas, a luxury retreat near Borobudur."
        />
        <meta name="twitter:image" content="/meta-image.png" />
      </head>
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
