import bcrypt from "bcryptjs";
import Cookies from "cookies";
import { sign } from "jsonwebtoken";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import prisma from "../../../lib/prisma";
import getSecretKey from "../../../utils/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const cookies = new Cookies(req, res, { secure: true });
  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;
        const logUser = await prisma.user.findUniqueOrThrow({
          where: {
            email,
          },
        });

        if (!bcrypt.compareSync(password, logUser.password)) {
          throw new Error("Invalid password");
        }

        const secret = getSecretKey();

        // password match
        const { password: _, ...userWithoutPassword } = logUser;
        const token = sign({ ...userWithoutPassword }, secret);

        res.setHeader("Authorization", `Bearer ${token}`);
        cookies.set("token", `Bearer ${token}`);

        return res.status(200).json({
          ...userWithoutPassword,
        });
      } catch (error) {
        console.log(error);
        return res.status(405).end({ message: error });
      }
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
