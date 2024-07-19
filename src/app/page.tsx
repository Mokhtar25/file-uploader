import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await db.query.files.findMany();
  return (
    <main className="">
      <div className="flex flex-wrap">
        {data.map((e) => (
          <div className="flex flex-col" key={e.id}>
            <img src={e.url} alt="" />
            <span>{e.name}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
