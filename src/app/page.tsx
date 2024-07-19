import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

// const mockFiles = [
//   "https://utfs.io/f/bd99990a-93cf-44ff-8f5f-932f7d69dec3-mafdd0.png",
//   "https://utfs.io/f/4cb31b53-ac9a-4c5b-9019-184a274ddeb4-d1185k.png",
//   "https://utfs.io/f/9b27cd3b-80ee-4ce5-be14-7b19548ee220-fiufhi.png",
// ];
//
// const mockImages = mockFiles.map((e, index) => ({
//   url: e,
//   id: index + 1,
// }));

export default async function HomePage() {
  const data = await db.query.files.findMany();
  return (
    <main className="">
      <div className="flex flex-wrap">
        {data.map((e) => (
          <img src={e.url} alt="" key={e.id} />
        ))}
      </div>
    </main>
  );
}
