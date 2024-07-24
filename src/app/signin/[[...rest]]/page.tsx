import { SignIn, SignUp } from "@clerk/nextjs";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GuestLog from "~/comp/GuestLog";

export default function page() {
  const user = auth();

  if (user.userId) redirect("/");
  return (
    <div className="absolute inset-0 flex h-screen w-screen items-center justify-center gap-16 bg-slate-100">
      <div className="h-[460px] w-[400px]">
        <SignUp />
      </div>
      <div className="mt-20 flex size-96 flex-col gap-12 rounded text-5xl font-bold text-slate-800 shadow-black">
        <span>Easy and secure access to your content</span>
        <span className="text-3xl font-medium text-slate-500">
          Try it Today for free
        </span>
        <GuestLog />
      </div>
    </div>
  );
}
