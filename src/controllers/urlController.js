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

async function getUrlsById (req, res) {
    const { id } = req.params;
  
    const { rows: userUrls, rowCount }  = await connection.query(
      `SELECT id, "shortUrl", url FROM urls WHERE "userId" = $1`,
      [id]
    );

    if (rowCount === 0) return res.sendStatus(404);
  
    res.status(200).send(userUrls);
}

export { createShortUrl, getUrlsById };
