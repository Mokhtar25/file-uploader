"use client";
import { useClerk } from "@clerk/nextjs";
import { makeUser } from "../utils/token";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function GuestLog() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const client = useClerk();
  async function make() {
    try {
      setLoading(true);

      const user = await makeUser();
      if (!user.username) return;
      const data = await client.client.signIn.create({
        identifier: user.username,
        password: user.password,
      });

      await client.setActive({
        session: data.createdSessionId,
      });

      return router.push("/");
    } catch (error) {
      toast("an error has occurred");
      setLoading(false);
    }
  }
  return (
    <Button
      onClick={make}
      className={loading ? "bg-slate-500" : ""}
      disabled={loading}
    >
      Login in as Guest
    </Button>
  );
}
