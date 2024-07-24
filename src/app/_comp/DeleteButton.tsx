"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";

import { useFormStatus } from "react-dom";

export function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      title="delete"
      type="submit"
      variant={"outline"}
      size={"icon"}
      disabled={pending}
      className={pending ? "brightness-90" : ""}
    >
      <TrashIcon color="red" className="size-4" />
    </Button>
  );
}
