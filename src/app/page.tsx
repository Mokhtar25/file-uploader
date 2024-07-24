import { SignedIn } from "@clerk/nextjs";
import { deleteFilesByKey, getUserFiles } from "~/server/queries";
import MultiUploader from "./_comp/UploadButtonCustom";
import DownloadButton from "./_comp/DownloadButton";
import { FilesLine } from "./_comp/FilesLine";
import type { FilesType } from "./_comp/FilesLine";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";
import { DeleteButton } from "./_comp/DeleteButton";
import { LinkDialog } from "./_comp/LinkDialog";

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
              <DeleteButton />
            </form>
            <DownloadButton className="" src={e.url} imageName={e.name} />
            <LinkDialog id={e.id} />
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
