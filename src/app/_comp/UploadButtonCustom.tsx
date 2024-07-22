"use client";
import { useDropzone } from "@uploadthing/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { generateClientDropzoneAccept } from "uploadthing/client";
import { toast } from "sonner";

import { useUploadThing } from "~/utils/uploadthing";

export default function MultiUploader() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      toast.dismiss("upload-start");
      router.refresh();
      setFiles([]);
      toast("Upload Complete");
    },
    onUploadError: () => {
      toast.dismiss("upload-start");
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

const FileUp = () => {
  return (
    <div className="flex items-center gap-2 text-base">
      <LoadingSpinner />
      <span>Uploading...</span>
    </div>
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
        <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle>
      </g>
    </svg>
  );
};
