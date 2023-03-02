import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await prisma.user.findMany({});
        res.status(200).json(users);
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
