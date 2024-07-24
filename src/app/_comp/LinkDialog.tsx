"use client";
import { getToken } from "~/utils/token";
import { useState } from "react";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

export const LinkDialog = ({ id }: { id: number }) => {
  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState("");
  const days = 2;
  const click = async () => {
    const token = await getToken(id, days);
    // Handel rejection in here vNotAllowedError

    setToken(window.location.href + "share/" + token);

    return token;
  };

  const copyToClip = async () => {
    await navigator.clipboard.writeText(token);
    setCopied(true);
  };

  return (
    <Dialog onOpenChange={() => setCopied(false)}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          title="share file"
          variant={"outline"}
          onClick={click}
        >
          <LinkSvg />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
            <br /> Valid for 2 days
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={token} readOnly />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={copyToClip}>
            <span className="sr-only">Copy</span>
            {copied ? <CheckIcon /> : <CopyIcon className="h-4 w-4" />}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// everything you import becomes a client component
//
const LinkSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
      />
    </svg>
  );
};
