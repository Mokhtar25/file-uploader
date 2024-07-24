"use client";
import { useClerk } from "@clerk/nextjs";
import { makeUser } from "../utils/token";
import { redirect } from "next/navigation";

export default function GuestLog() {
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
    redirect("/");
  }
  return <div onClick={make}>GuestLog</div>;
}
