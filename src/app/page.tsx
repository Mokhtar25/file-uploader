import { db } from "~/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await db.query.files.findMany();
  return (
    <main className="">
      <SignedOut>please sign in above</SignedOut>
      <SignedIn>
        <div className="flex flex-wrap">
          {data.map((e) => (
            <div className="flex flex-col" key={e.id}>
              <img src={e.url} alt="" />
              <span>{e.name}</span>
            </div>
          ))}
        </div>
      </SignedIn>
    </main>
  );
}
