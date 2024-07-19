import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { files } from "./db/schema";
import { eq, name } from "drizzle-orm";

export async function getUserImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");
  const data = await db
    .select()
    .from(files)
    .where(eq(files.userId, user.userId));
  return data;
}
