import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { ClerkProvider } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import TopNav from "./_comp/TopNav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import { Toaster } from "~/components/ui/sonner";

import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
export const metadata: Metadata = {
  title: "File-uploader",
  description: "made for the Odin Project",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
  model,
}: Readonly<{ children: React.ReactNode; model: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable} `}>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <body>
          <div className="grid h-screen grid-rows-[auto,1fr]">
            <TopNav />

            <main className="overflow-y-scroll">{children}</main>
          </div>
          {model}
          <div id="model-root"></div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
