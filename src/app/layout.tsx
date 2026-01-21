import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // Import Montserrat
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Movie Database",
  description: "Manage your favorite movies with ease",
};

import { RouteGuard } from '@/providers/RouteGuard';
import StoreProvider from '@/providers/StoreProvider';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} bg-background antialiased`}>
        <StoreProvider>
          <RouteGuard>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#092C39',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                },
              }}
            />
          </RouteGuard>
        </StoreProvider>
      </body>
    </html>
  );
}
