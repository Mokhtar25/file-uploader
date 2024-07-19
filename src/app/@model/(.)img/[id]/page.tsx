import { getImageById } from "~/server/queries";

export default async function PhotoModel({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNum = parseInt(photoId);
  if (Number.isNaN(idAsNum)) throw new Error("Invalid photo id");

  const image = await getImageById(idAsNum);
  return (
    <div>
      {" "}
      <img src={image.url} alt={image.name} />
    </div>
  );
}
