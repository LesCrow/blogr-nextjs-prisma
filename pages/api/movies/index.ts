import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import checkToken from "../../../middlewares/checkToken.ts";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { apiId } = req.query;
  const { api_id, favourite, alreadySeen, userId } = req.body;
  const parsedApi_id = parseInt(apiId as string);

  checkToken(req, res, async () => {
    switch (method) {
      case "GET":
        if (req.body.role === "ADMIN") {
          try {
            const movies = await prisma.movie.findMany({});
            res.status(200).json(movies);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: error });
          }
        }
        if (req.body.role === "USER") {
          if (parsedApi_id) {
            try {
              const movies = await prisma.movie.findMany({
                where: {
                  api_id: parsedApi_id,
                },
              });
              res.status(200).json(movies);
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: error });
            }
          }
          try {
            const movies = await prisma.movie.findMany({
              where: {
                userId: req.body.id,
              },
            });
            res.status(200).json(movies);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: error });
          }
        }
        break;

      case "POST":
        try {
          const newMovie = await prisma.movie.create({
            data: {
              api_id: api_id,
              alreadySeen: alreadySeen,
              favourite: favourite,
              userId: userId,
            },
          });
          res.status(200).json(newMovie);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: error });
        }
        break;

      default:
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
};

export default handler;
