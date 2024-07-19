import { SignedIn, SignedOut } from "@clerk/nextjs";
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
        <div className="flex flex-col" key={e.id}>
          <img src={e.url} alt="" />
          <span>{e.name}</span>
        </div>
      ))}
    </div>
  );
};
