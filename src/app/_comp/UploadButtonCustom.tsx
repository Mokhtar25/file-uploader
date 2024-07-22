"use client";
import { useDropzone } from "@uploadthing/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "~/utils/uploadthing";

export default function MultiUploader() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      router.refresh();
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });
  // this is very simple the other stuff is for adding multipal files and drag and drop function

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="bg-blue-500" />
      <div className="bg-green-400">
        {files.length > 0 && (
          <button className="bg-red-400" onClick={() => startUpload(files)}>
            Upload {files.length} files
          </button>
        )}
      </div>
      Drop files here!
    </div>
  );
}
