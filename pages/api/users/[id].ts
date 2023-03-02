import bcrypt from "bcryptjs";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const user = await prisma.user.findUniqueOrThrow({
          where: {
            id: id as string,
          },
        });
        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
      break;
    case "PUT":
      try {
        const { name, email, password, image } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const updatedUser = await prisma.user.update({
          where: {
            id: id as string,
          },
          data: {
            name: name,
            email: email,
            password: hashedPassword,
            image: image,
          },
        });
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
      break;
    case "DELETE":
      try {
        const deletedUser = await prisma.user.delete({
          where: {
            id: id as string,
          },
        });
        res.status(200).json(deletedUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
