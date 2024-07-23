import { getFilesById } from "~/server/queries";

export default async function FullPageFile({ id }: { id: number }) {
  const image = await getFilesById(id);

  return (
    <div
      style={{ backgroundImage: `url("${image.url}")` }}
      className="absolute inset-0 left-0 right-0 top-20 mx-auto flex h-3/4 w-3/4 min-w-0 flex-shrink items-center justify-center rounded bg-red-500 bg-cover bg-center"
    ></div>
  );
}
//<img src={image.url} alt={image.name} className="object-contain" />
