import { NextApiResponse, NextApiRequest } from "next";
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const genre = await prisma.genre.findUniqueOrThrow({
          where: {
            id: id as string,
          },
        });
        res.status(200).json(genre);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
      break;

    case "PUT":
      try {
        const { name } = req.body;
        const updatedGenre = await prisma.genre.update({
          where: {
            id: id as string,
          },
          data: {
            name: name,
          },
        });
        res.status(200).json(updatedGenre);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
      break;

    case "DELETE":
      try {
        const deletedGenre = await prisma.genre.delete({
          where: {
            id: id as string,
          },
        });
        res.status(200).json(deletedGenre);
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
