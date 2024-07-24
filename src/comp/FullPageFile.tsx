import { getFilesById, getFilesByIdNoAuth } from "~/server/queries";

//import PdfView from "./PdfView";
export default async function FullPageFile({
  id,
  share,
}: {
  id: number;
  share?: boolean;
}) {
  const image = share ? await getFilesByIdNoAuth(id) : await getFilesById(id);
  const ImageExt = [".jpeg", ".jpg", ".png", "avif"];

  const fileIsImage = ImageExt.some((e) => image?.name.endsWith(e));

  return (
    <div
      style={{ backgroundImage: `url("${image?.url}")` }}
      className="absolute inset-0 left-0 right-0 top-20 mx-auto flex h-3/4 w-3/4 min-w-0 flex-shrink items-center justify-center rounded bg-slate-300 bg-cover bg-center shadow-lg shadow-slate-700"
    >
      {!fileIsImage && (
        <span className="text-4xl text-black/40">Could not open file</span>
      )}
    </div>
  );
}
//<img src={image.url} alt={image.name} className="object-contain" />
