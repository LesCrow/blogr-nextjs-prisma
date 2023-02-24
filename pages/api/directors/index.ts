import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const directors = await prisma.director.findMany();
        res.status(200).json(directors);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
      break;

    case "POST":
      try {
        const newDirector = await prisma.director.create({
          data: {
            name: req.body.name,
          },
        });
        res.status(200).json(newDirector);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
