"use client";

import React from "react";
import { Button } from "~/components/ui/button";

interface PropsDownloadButton {
  src: string;
  imageName: string;
  className: string;
}

export default function DownloadButton({
  src,
  imageName,
  className,
}: PropsDownloadButton) {
  async function retrieveFileBlob() {
    const file = await fetch(src);

    const fileBlob = await file.blob();

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(fileBlob);
    link.download = imageName;
    link.click();
    link.remove();
  }

  return (
    <Button
      onClick={retrieveFileBlob}
      variant={"outline"}
      size={"icon"}
      className="hover:cursor-pointer"
    >
      <DownloadSvg />
    </Button>
  );
}

const DownloadSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  );
};
