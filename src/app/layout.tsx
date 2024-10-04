import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const popins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sinaker",
  description: "Sistem Informasi Ketenagakerjaan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo.png" />
      </head>
      <body className={`${popins.className} text-[#3D3D3D]`}>
        <NextTopLoader showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
