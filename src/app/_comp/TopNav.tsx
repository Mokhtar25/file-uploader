"use client";
import { SignedOut, SignInButton, UserButton, SignedIn } from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";
import React from "react";
import { useRouter } from "next/navigation";
const TopNav = () => {
  const router = useRouter();

  return (
    <nav className="flex h-16 items-center justify-between bg-slate-100 px-8 text-xl">
      <span className="text-2xl">File Uploader</span>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-2">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={() => {
                router.refresh();
              }}
            />

            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default TopNav;
