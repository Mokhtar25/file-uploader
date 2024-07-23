import jwt from "jsonwebtoken";

interface TokenData {
  fileId: string;
  expireTime: string;
}

const sec = process.env.SECRET!;
export function getToken(fileId: string, time: string) {
  // to do

  const tokenData: TokenData = {
    fileId,
    expireTime: time,
  };
  return jwt.sign(tokenData, sec);
}

export function getDataFromToken(token: string) {
  // ts-ignore
  const data = jwt.verify(token, sec) as TokenData;
  console.log(data);
  if (!data || data.fileId) {
    console.log("token error");
    return {
      expired: true,
    };
  }
  // to do
  const expired = data.expireTime;

  return {
    expired: expired,
    ...data,
  };
}
