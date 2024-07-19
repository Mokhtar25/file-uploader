import FullPageFile from "~/comp/FullPageFile";

export default async function PhotoModel({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNum = parseInt(photoId);
  if (Number.isNaN(idAsNum)) throw new Error("Invalid photo id");

  return <FullPageFile id={idAsNum} />;
}
