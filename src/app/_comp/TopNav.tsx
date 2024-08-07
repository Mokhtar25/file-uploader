import { SignedOut, SignInButton, UserButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";

import logo from "public/favicon.png";

const TopNav = async ({ fallback }: { fallback?: boolean }) => {
  return (
    <nav className="flex h-16 items-center justify-between bg-slate-100 px-8 text-xl shadow-md">
      <Link href={"/"} className="flex items-center gap-1">
        <img src={logo.src} alt="logo" className="size-16" />
        <span className="text-2xl">File Uploader</span>
      </Link>
      {!fallback && (
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
      )}
    </nav>
  );
};

export default TopNav;
