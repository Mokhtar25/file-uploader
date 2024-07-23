import { type InferSelectModel } from "drizzle-orm";
import Link from "next/link";
import type { files } from "~/server/db/schema";

export type FilesType = InferSelectModel<typeof files>;
type FileType = "image" | "pdf" | "other";

interface PropsLineBefore extends FilesType {
  children: React.ReactNode;
}
type PropsLine = Omit<PropsLineBefore, "key">;

export const FilesLine = async ({
  url,
  name,
  createdAt,
  updatedAt,
  id,
  userId,
  children,
}: PropsLine) => {
  return (
    <div className="grid w-full grid-cols-[4fr,2fr,1fr,1fr,1fr] items-center gap-4 border-y-[1px] border-black/35 bg-white px-8 py-2 hover:bg-slate-200">
      <Link
        href={`/img/${id}`}
        className="flex items-center gap-2 overflow-clip"
      >
        <div className="flex max-w-96 items-center gap-2">
          <RenderIcon name={name} />
          <span
            title={name}
            className="max-w-3/4 line-clamp-1 text-ellipsis hover:underline"
          >
            {name}
          </span>
        </div>
      </Link>
      {updatedAt?.toTimeString === createdAt.toTimeString ? (
        <span className="text-slate-500">
          Created at <p className="text-black">{createdAt.toDateString()}</p>
        </span>
      ) : (
        <span className="text-slate-700">
          Last Modified <p>{updatedAt?.getUTCDate()}</p>
        </span>
      )}
      {children}
    </div>
  );
};

const RenderIcon = ({ name }: { name: string }) => {
  function typeS(): FileType {
    if (name.endsWith(".pdf")) return "pdf";
    else if (
      name.endsWith(".jpg") ||
      name.endsWith(".png") ||
      name.endsWith(".jpeg")
    ) {
      return "image";
    } else {
      return "other";
    }
  }
  const type = typeS();
  switch (type) {
    case "image":
      return <ImageSvg />;
    case "pdf":
      return <PdfSvg />;
    default:
      return <OtherSvg />;
  }
};

const ImageSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
};

const OtherSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
};

const PdfSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
};
