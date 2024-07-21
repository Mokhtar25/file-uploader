import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { getUserImages } from "~/server/queries";
import MultiUploader from "./_comp/UploadButtonCustom";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>please sign in above</SignedOut>
      <SignedIn>
        <MultiUploader />
        <Images />
      </SignedIn>
    </main>
  );
}

const Images = async () => {
  const data = await getUserImages();
  return (
    <div className="grid grid-cols-3">
      {data.map((e) => (
        <Link href={`/img/${e.id}`} key={e.id}>
          <div className="flex size-96 flex-col">
            <img src={e.url} alt={e.name} className="object-contain" />
            <span>{e.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
