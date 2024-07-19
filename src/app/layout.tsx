import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "File-uploader",
  description: "made for the Odin Project",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TopNav />

        {children}
      </body>
    </html>
  );
}

const TopNav = () => {
  return (
    <nav className="flex h-12 items-center justify-between bg-slate-100 px-8 text-xl">
      <span className="text-2xl">File Uploader</span>
      <span> Sign in</span>
    </nav>
  );
};
