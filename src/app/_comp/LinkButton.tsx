export default function xx() {
  return null;
}
//"use client";
//import { Button } from "~/components/ui/button";
//import { DialogTrigger } from "@radix-ui/react-dialog";
//// everything you import becomes a client component
////
//import { getToken } from "~/utils/token";
//import { LinkDialog } from "./LinkDialog";
//export default function LinkButton({ id }: { id: number }) {
//  const days = 2;
//  const click = async () => {
//    const token = await getToken(id, days);
//    // Handel rejection in here vNotAllowedError
//    await navigator.clipboard.writeText(token);
//    return token;
//  };
//
//  // to do
//  return (
//    <>
//      <Button type="submit" size={"icon"} variant={"outline"} onClick={click}>
//        <LinkSvg />
//      </Button>
//      <LinkDialog />
//    </>
//  );
//}
//
//const LinkSvg = () => {
//  return (
//    <svg
//      xmlns="http://www.w3.org/2000/svg"
//      fill="none"
//      viewBox="0 0 24 24"
//      strokeWidth={1.5}
//      stroke="currentColor"
//      className="size-6"
//    >
//      <path
//        strokeLinecap="round"
//        strokeLinejoin="round"
//        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
//      />
//    </svg>
//  );
//};
