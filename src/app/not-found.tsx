import Link from "next/link";
export default function Custom404() {
  return (
    <div className="m-8 flex flex-col text-8xl">
      404 Not found
      <span className="my-4 text-2xl">
        Click{" "}
        <Link className="text-fuchsia-700" href={"/"}>
          here
        </Link>{" "}
        to return to the main Page
      </span>
    </div>
  );
}
