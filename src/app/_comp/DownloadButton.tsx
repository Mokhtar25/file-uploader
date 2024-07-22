"use client";

import React from "react";
import { Button } from "~/components/ui/button";

interface PropsDownloadButton {
  src: string;
  imageName: string;
}

export default function DownloadButton({
  src,
  imageName,
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

  return <Button onClick={retrieveFileBlob}>Download</Button>;
}
