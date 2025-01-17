import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GlobalProvider from "./context/GlobalContext";
import ProviderLayout from "@/components/ProviderLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          rel="stylesheet"
          href="./contentbuilderbase/contentbuilder/contentbuilder.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="./contentbuilderbase/assets/minimalist-blocks/content.css"
          type="text/css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProviderLayout>
          <GlobalProvider>{children}</GlobalProvider>
        </ProviderLayout>
      </body>
    </html>
  );
}
