"use client";
import { SignedOut, SignInButton, UserButton, SignedIn } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";

import logo from "public/favicon.png";

const TopNav = () => {
  return (
    <nav className="flex h-16 items-center justify-between bg-slate-100 px-8 text-xl">
      <Link href={"/"} className="flex items-center gap-1">
        <img src={logo.src} alt="logo" className="size-16" />
        <span className="text-2xl">File Uploader</span>
      </Link>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-2">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default TopNav;
