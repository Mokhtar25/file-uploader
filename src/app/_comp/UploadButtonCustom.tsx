"use client";

import { useDropzone } from "@uploadthing/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { generateClientDropzoneAccept } from "uploadthing/client";
import { toast } from "sonner";

import { useUploadThing } from "~/utils/uploadthing";
import { Button } from "~/components/ui/button";

export default function MultiUploader() {
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      toast.dismiss("upload-start");
      router.refresh();
      setFiles([]);
      toast("Upload Complete");
      setUploading(false);
    },
    onUploadError: () => {
      toast.dismiss("upload-start");

      setUploading(false);
      toast.error("an error has occurred");
    },
    onUploadBegin: () => {
      toast(<FileUp />, {
        duration: 90000,
        id: "upload-start",
      });
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

  // disbale button while uploading
  return (
    <div className="m-8 flex h-24 w-40 flex-col gap-2">
      <div
        className="flex cursor-pointer items-center justify-center rounded bg-slate-400 p-4 text-white"
        {...getRootProps()}
      >
        <input
          {...getInputProps()}
          disabled={uploading}
          className="h-full w-full"
        />
        {files.length === 0 ? (
          <UploadSvg />
        ) : (
          <span> {files.length} files </span>
        )}
      </div>
      <Button
        className={"w-full " + (uploading ? "bg-slate-400" : "bg-slate-900")}
        disabled={uploading}
        onClick={() => {
          if (files.length === 0) return;
          setUploading(true);
          return startUpload(files);
        }}
      >
        {uploading ? "Uploading.." : "Upload"}
      </Button>
    </div>
  );
}
//<div {...getRootProps()}>
//<div className="bg-green-400">
//<input {...getInputProps()} className="bg-blue-500" />
//{files.length > 0 && (
//    <button className="bg-red-400" onClick={() => startUpload(files)}>
//    Upload {files.length} files
//    </button>
//)}
//</div>
//Drop files here!
//</div>

const FileUp = () => {
  return (
    <div className="flex items-center gap-2 text-base">
      <LoadingSpinner />
      <span>Uploading...</span>
    </div>
  );
};

const UploadSvg = () => {
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
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
};

const LoadingSpinner = () => {
  return (
    <svg
      width="24"
      height="24"
      stroke="#000"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="spinner_V8m1">
        <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3"></circle>
      </g>
    </svg>
  );
};
