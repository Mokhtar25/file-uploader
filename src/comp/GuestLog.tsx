"use client";
import { useClerk } from "@clerk/nextjs";
import { makeUser } from "../utils/token";
import { useRouter } from "next/navigation";

export default function GuestLog() {
  const router = useRouter();
  const client = useClerk();
  async function make() {
    const user = await makeUser();
    if (!user.username) return;
    const data = await client.client.signIn.create({
      identifier: user.username,
      password: user.password,
    });

    console.log(data);
    await client.setActive({
      session: data.createdSessionId,
    });
    return router.push("/");
  }
  return <div onClick={make}>GuestLog</div>;
}
