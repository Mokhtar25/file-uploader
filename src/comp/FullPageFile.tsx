import { getImageById } from "~/server/queries";

export default async function FullPageFile({ id }: { id: number }) {
  const image = await getImageById(id);
  return (
    <div>
      <img src={image.url} alt={image.name} />
    </div>
  );
}
