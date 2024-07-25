"use server";
import { clerkClient } from "@clerk/nextjs/server";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@clerk/nextjs/server";

import { env } from "~/env";
interface TokenData {
  fileId: number;
  expireTime: Date;
}

const sec = env.SECRET;
export async function getToken(fileId: number, days: number) {
  // to do

  if (!auth().userId) redirect("/signin");
  const expireTime = new Date();
  expireTime.setDate(expireTime.getDate() + days);
  const tokenData: TokenData = {
    fileId,
    expireTime: expireTime,
  };
  return jwt.sign(tokenData, sec);
}

export async function getDataFromToken(token: string) {
  // make those functions not async
  try {
    const data = jwt.verify(token, sec) as TokenData;
    if (!data?.fileId) {
      return {
        expired: true,
        ...data,
      };
    }
    // to do you can use -  to mange time and do not need to use any database to help
    const now = new Date();
    const expiretime = new Date(data.expireTime);
    const expired = expiretime < now;

    return {
      expired: expired,
      ...data,
    };
  } catch (err) {
    redirect("/404");
  }
}

export async function makeUser() {
  const client = clerkClient();
  const user = await client.users.createUser({
    username: `GuestUser${uuidv4()}`,
    password: "1234567admin",
  });
  return { username: user.username, password: "1234567admin" };
}
