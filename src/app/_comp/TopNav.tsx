import { SignedOut, SignInButton, UserButton, SignedIn } from "@clerk/nextjs";
import React from "react";
SignedOut;
const TopNav = () => {
  return (
    <nav className="flex h-12 items-center justify-between bg-slate-100 px-8 text-xl">
      <span className="text-2xl">File Uploader</span>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default TopNav;
