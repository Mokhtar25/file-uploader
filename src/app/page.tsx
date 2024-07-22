import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { deleteFilesByKey, getUserFiles } from "~/server/queries";
import MultiUploader from "./_comp/UploadButtonCustom";
import { Button } from "~/components/ui/button";
import DownloadButton from "./_comp/DownloadButton";
import { FilesLine } from "./_comp/FilesLine";
import LinkButton from "./_comp/LinkButton";

export const dynamic = "force-dynamic";
//<MultiUploader />

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>please sign in above</SignedOut>
      <SignedIn>
        <Files />
      </SignedIn>
    </main>
  );
}

const Files = async () => {
  const data = await getUserFiles();
  return (
    <div className="h-96 w-full bg-slate-200">
      {data.map((e) => (
        <div key={e.key} className="">
          <FilesLine {...e}>
            <form
              action={async () => {
                "use server";
                await deleteFilesByKey(e.key);
                console.log("done");
              }}
            >
              <Button variant={"outline"} type="submit">
                Delete
              </Button>
            </form>
            <DownloadButton className="" src={e.url} imageName={e.name} />
            <LinkButton />
          </FilesLine>
        </div>
      ))}

      <MultiUploader />
    </div>
  );
};

//<div key={e.id} className="flex flex-col">
//<Link href={`/img/${e.id}`} key={e.id}>
//<div className="flex size-96 flex-col">
//<img src={e.url} alt={e.name} className="object-contain" />
//<span>{e.name}</span>
//</div>
//</Link>
//<form
//action={async () => {
//    "use server";
//    await deleteFilesByKey(e.key);
//    console.log("done");
//}}
//>
//<Button variant={"destructive"} type="submit">
//{" "}
//Delete
//</Button>
//</form>
//<DownloadButton
//className="h-12 w-28"
//src={e.url}
//imageName={e.name}
///>
//</div>
