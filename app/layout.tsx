import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VentureCraft — Learn startups by running one",
  description:
    "A free, simple and fun way to learn how startups work. Run a pretend company, make choices, and see what happens. No sign-up needed.",
  icons: { icon: "/favicon.svg" },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "VentureCraft",
    description: "Learn startups the simple way — by running a pretend company. Free, no sign-up.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
