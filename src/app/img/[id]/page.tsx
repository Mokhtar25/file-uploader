export default async function PhotoModel({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return <div> {photoId}</div>;
}
