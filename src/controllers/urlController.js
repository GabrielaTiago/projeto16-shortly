import { connection } from "../database/postgres.js";
import { nanoid } from "nanoid/non-secure";

async function createShortUrl(req, res) {
  const { url } = req.body;

  const shortUrl = nanoid(15);

  console.log(shortUrl);
  try {
    const { rowCount } = await connection.query(
      'SELECT * FROM urls WHERE "shortUrl" = $1',
      [shortUrl]
    );

    if (rowCount === 1) return res.sendStatus(409);

    await connection.query(
      `INSERT INTO urls ("shortUrl", url)
         VALUES ($1, $2)`,
      [shortUrl, url]
    );

    res.status(201).send({shortUrl: shortUrl});

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export { createShortUrl };
