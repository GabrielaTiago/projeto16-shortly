import { connection } from "../database/postgres.js";

async function getUserData(req, res) {
  const userId = res.locals.id;

  try {
    const { rowCount } = await connection.query(
        "SELECT * FROM users WHERE id = $1",
        [userId]
    )
    
    if (rowCount === 0) return res.sendStatus(404);

    const { rows: userInfo } = await connection.query(
      `SELECT 
            us.id,
            name,
            SUM(ur."visitCount") AS "visitCount",
            ARRAY_AGG(
                JSON_BUILD_OBJECT(
                    'id', ur.id,
                    'shortUrl', ur."shortUrl",
                    'url', ur.url,
                    'visitCount', ur."visitCount"
                )) AS "shortenedUrls"
         FROM users us
         JOIN urls ur
         ON ur."userId" = us.id
         WHERE us.id = $1
         GROUP BY us.id`,
      [userId]
    );

    res.status(200).send(userInfo);

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export { getUserData };
