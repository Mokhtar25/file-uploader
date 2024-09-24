"use server";
import { clerkClient } from "@clerk/nextjs/server";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { files } from "~/server/db/schema";
import { eq } from "drizzle-orm";

import { env } from "~/env";
interface TokenData {
  fileId: number;
  expireTime: Date;
}

export async function getToken(fileId: number, days: number) {
  if (!auth().userId) redirect("/signin");
  // also check if the same user is owner to the picture
  const expireTime = new Date();
  expireTime.setDate(expireTime.getDate() + days);
  const tokenData: TokenData = {
    fileId,
    expireTime: expireTime,
  };
  return jwt.sign(tokenData, env.SECRET);
}

export async function getDataFromToken(token: string) {
  // make those functions not async
  try {
    const data = jwt.verify(token, env.SECRET) as TokenData;
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
    // redirect actually throws an error, watch out when using inside a try catch block
    redirect("/404");
  }
}

export async function makeUser() {
  const client = clerkClient();
  // you can also make a unique password for each user
  // clean the user or create it if not made
  try {
    const user = await client.users.createUser({
      username: `GuestUser${uuidv4()}`,
      password: "1234567admin",
    });

    return { username: user.username, password: "1234567admin" };
  } catch (err) {
    console.log("error", err);
    const userDB = "user_2kKP0aRbKHUY320dvOr0vVk2yyy";
    const userId = "GuestUser";
    await db.delete(files).where(eq(files.userId, userDB));

    return {
      username: userId,
      password: "1234567admin",
    };
  }
}
