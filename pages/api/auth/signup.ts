import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import Cookies from "cookies";
import bcrypt from "bcryptjs";
import prisma from "../../../lib/prisma";
import getSecretKey from "../../../utils/auth";
import jwt from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { email, password, name } = req.body;
  const cookies = new Cookies(req, res, { secure: true });

  switch (method) {
    case "POST":
      try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });

        const secret = getSecretKey();

        const { password: removedPassword, ...userWithoutPassword } = newUser;

        const token = jwt.sign(userWithoutPassword, secret, {
          expiresIn: "10m",
        });

        res.setHeader("Authorization", `Bearer ${token}`);
        cookies.set("token", `Bearer ${token}`);

        res.status(200).json(userWithoutPassword);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
      break;
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
