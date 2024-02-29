import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import TanstackProvider from "@/providers/TanstackProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fithall Event Space and Studio",
  description: "fithall.id",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <Toaster position="top-right" richColors closeButton />
          <Header />
          <div className="sm:px-4 md:px-12 lg:px-18 xl:px-24 font-plus-jakarta-sans min-h-screen">
            {children}
          </div>
          <Footer />
        </TanstackProvider>
      </body>
    </html>
  );
}
