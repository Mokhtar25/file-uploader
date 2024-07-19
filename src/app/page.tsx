import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { getUserImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>please sign in above</SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}

const Images = async () => {
  const data = await getUserImages();
  return (
    <div className="flex flex-wrap">
      {data.map((e) => (
        <Link href={`/img/${e.id}`} key={e.id}>
          <div className="flex size-96 flex-col">
            <img src={e.url} alt={e.name} />
            <span>{e.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
