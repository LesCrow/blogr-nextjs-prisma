import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import { NextMiddleware } from "next/server";
import getSecretKey from "../utils/auth";

export default function checkToken(
  req: NextApiRequest,
  res: NextApiResponse,
  next
) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "You need to login first !" });
  }

  const secret = getSecretKey();

  const decodedToken = jwt.verify(token, secret);

  if (typeof decodedToken === "string") {
    throw new Error(decodedToken);
  }

  req.body = decodedToken;
  next();
}
