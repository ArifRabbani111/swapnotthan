import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { FirebaseAuthProvider } from "@/components/providers/firebase-auth-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swapnotthan | Modernized Platform",
  description: "A professional platform for Swapnotthan foundation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  window.addEventListener('unhandledrejection', function(event) {
    var reason = event.reason;
    var isEventLike = reason instanceof Event ||
      (typeof reason === 'object' && reason !== null && !(reason instanceof Error) && (String(reason) === '[object Event]' || (reason.constructor && reason.constructor.name === 'Event')));
    if (isEventLike) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
})();
            `.trim(),
          }}
        />
        <SessionProvider>
          <FirebaseAuthProvider>
          <QueryProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster position="top-center" richColors />
          </QueryProvider>
          </FirebaseAuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
