"use client";
import { Button } from "~/components/ui/button";

import { useFormStatus } from "react-dom";

export function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={"outline"}
      disabled={pending}
      className={pending ? "brightness-90" : ""}
    >
      Delete
    </Button>
  );
}
