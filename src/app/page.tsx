import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { deleteFilesByKey, getUserFiles } from "~/server/queries";
import MultiUploader from "./_comp/UploadButtonCustom";
import { Button } from "~/components/ui/button";
import DownloadButton from "./_comp/DownloadButton";

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
  const data = await getUserFiles();
  return (
    <div className="grid grid-cols-3">
      {data.map((e) => (
        <div key={e.id} className="flex flex-col">
          <Link href={`/img/${e.id}`} key={e.id}>
            <div className="flex size-96 flex-col">
              <img src={e.url} alt={e.name} className="object-contain" />
              <span>{e.name}</span>
            </div>
          </Link>
          <form
            action={async () => {
              "use server";
              await deleteFilesByKey(e.key);
              console.log("done");
            }}
          >
            <Button variant={"destructive"} type="submit">
              {" "}
              Delete
            </Button>
          </form>
          <DownloadButton
            className="h-12 w-28"
            src={e.url}
            imageName={e.name}
          />
        </div>
      ))}
    </div>
  );
};
