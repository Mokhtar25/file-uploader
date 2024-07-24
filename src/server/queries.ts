import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { files } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { utapi } from "~/app/api/uploadthing/core";

export async function getUserFiles() {
  const user = auth();

  if (!user.userId) redirect("/signin");
  const data = await db
    .select()
    .from(files)
    .where(eq(files.userId, user.userId));
  return data;
}

export async function getFilesById(id: number) {
  const user = auth();

  if (!user.userId) redirect("/signin");

  const data = await db.select().from(files).where(eq(files.id, id));
  if (data.length === 0 || !data) redirect("/404");

  if (data[0]?.userId !== user.userId) redirect("/signin");

  return data[0];
}

export async function getFilesByIdNoAuth(id: number) {
  const data = await db.select().from(files).where(eq(files.id, id));

  if (data.length === 0 || !data) redirect("/404");
  return data[0];
}

export async function deleteFilesByKey(id: string) {
  const user = auth();

  if (!user.userId) redirect("/signin");

  await db
    .delete(files)
    .where(and(eq(files.key, id), eq(files.userId, user.userId)));

  await utapi.deleteFiles(id);

  redirect("/");
}
