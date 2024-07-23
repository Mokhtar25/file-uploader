import { SignedIn, SignedOut } from "@clerk/nextjs";
import { deleteFilesByKey, getUserFiles } from "~/server/queries";
import MultiUploader from "./_comp/UploadButtonCustom";
import { Button } from "~/components/ui/button";
import DownloadButton from "./_comp/DownloadButton";
import { FilesLine } from "./_comp/FilesLine";
import LinkButton from "./_comp/LinkButton";
import type { FilesType } from "./_comp/FilesLine";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";
//<MultiUploader />

export default async function HomePage() {
  const user = auth();
  if (!user.userId) redirect("/signin");

  return (
    <main className="flex h-full">
      <SignedIn>
        <section className="flex flex-col items-center justify-between border-r-2 border-black/25 px-8">
          <div className="mt-8 text-4xl font-medium">your files</div>
          <MultiUploader />
        </section>

        <Files />
      </SignedIn>
    </main>
  );
}

const objectWithoutKey = (e: FilesType) => {
  const clone = (({ key: _, ...o }) => o)(e);
  return clone;
};

const Files = async () => {
  const data = await getUserFiles();
  return (
    <div className="flex w-full flex-grow flex-col overflow-x-clip bg-slate-200 transition-all">
      {data.map((e) => (
        <div key={e.key} className="">
          <FilesLine {...objectWithoutKey(e)}>
            <form
              action={async () => {
                "use server";
                await deleteFilesByKey(e.key);
              }}
            >
              <Button variant={"outline"} type="submit">
                Delete
              </Button>
            </form>
            <DownloadButton className="" src={e.url} imageName={e.name} />
            <LinkButton id={e.id} />
          </FilesLine>
        </div>
      ))}
      {data.length === 0 && (
        <span className="my-52 self-center text-5xl text-slate-400">
          Add files to start !{" "}
        </span>
      )}
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
