import { redirect } from "next/navigation";
import React from "react";
import { getDataFromToken } from "~/utils/token";
import FullPageFile from "~/comp/FullPageFile";

const FileShareView = async ({
  params: { token },
}: {
  params: {
    token: string;
  };
}) => {
  const data = await getDataFromToken(token);
  console.log("data from await get data from token", data);
  if (!data || data.expired === true) {
    redirect("/login");
  }

  return <FullPageFile id={data.fileId} share={true} />;
};

export default FileShareView;
