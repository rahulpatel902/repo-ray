import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Repo-Ray | Codebase Visualization",
  description: "Instant codebase visualization using AI and Kestra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className="antialiased bg-background text-foreground"
      >
        {children}
      </body>
    </html>
  );
}
