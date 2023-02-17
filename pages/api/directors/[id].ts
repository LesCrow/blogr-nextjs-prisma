import { NextApiResponse, NextApiRequest } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const director = await prisma.director.findUniqueOrThrow({
          where: {
            id: id as string,
          },
        });
        res.status(200).json(director);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
      break;

    case "PUT":
      try {
        const { name } = req.body;
        const updatedDirector = await prisma.director.update({
          where: {
            id: id as string,
          },
          data: {
            name: name,
          },
        });
        res.status(200).json(updatedDirector);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
      break;

    case "DELETE":
      try {
        const deletedDirector = await prisma.director.delete({
          where: {
            id: id as string,
          },
        });
        res.status(200).json(deletedDirector);
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
