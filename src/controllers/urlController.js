import { connection } from "../database/postgres.js";
import { nanoid } from "nanoid/non-secure";

async function createShortUrl(req, res) {
  const { url } = req.body;
  const userId  = res.locals.id;
  const shortUrl = nanoid(10);

  try {
    const { rowCount } = await connection.query(
      'SELECT * FROM urls WHERE "shortUrl" = $1',
      [shortUrl]
    );

    if (rowCount === 1) return res.sendStatus(409);

    await connection.query(
      `INSERT INTO urls ("shortUrl", url, "userId")
         VALUES ($1, $2, $3)`,
      [shortUrl, url, userId]
    );

    res.status(201).send({shortUrl: shortUrl});

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export { createShortUrl };
