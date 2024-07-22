import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { files } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { utapi } from "~/app/api/uploadthing/core";

export async function getUserFiles() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");
  const data = await db
    .select()
    .from(files)
    .where(eq(files.userId, user.userId));
  return data;
}

export async function getFilesById(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const data = await db.select().from(files).where(eq(files.id, id));
  if (data.length === 0 || !data) throw new Error("No image found");

  if (data[0]?.userId !== user.userId) throw new Error("Unauthorized");

  return data[0];
}

export async function deleteFilesByKey(id: string) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(files)
    .where(and(eq(files.key, id), eq(files.userId, user.userId)));

  await utapi.deleteFiles(id);

  redirect("/");
}
