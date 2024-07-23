import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function page() {
  const user = auth();

  if (user.userId) redirect("/");
  return (
    <div>
      <SignIn />
    </div>
  );
}
