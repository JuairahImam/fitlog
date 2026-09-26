import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PlanProvider } from "@/context/plan-context";
import "./globals.css";
import { Navbar } from "./Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "fitlog app",
  description: "fitlog app for tracking your fitness progress",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <PlanProvider>
        <TooltipProvider delay={400}>
          <div className="mx-auto flex w-full max-w-270 flex-1 flex-col px-5 py-6 sm:px-8">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="mt-12">
              <Separator />
              <div className="flex items-center justify-between gap-4 py-5 text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 font-heading text-xs font-bold tracking-[0.08em] text-foreground">
                  <img src="/assets/logo.png" alt="" className="size-4" />
                  FITLOG
                </span>
                <p className="text-[10px] sm:text-[11px]">
                  © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
              </div>
            </footer>
          </div>
        </TooltipProvider>
        <Toaster theme="dark" position="bottom-right" />
        </PlanProvider>
      </body>
    </html>
  );
}
