import { connection } from "../database/postgres.js";

async function rankingViews(req, res) {
  try {
    const { rows: ranking } = await connection.query(
      `
      SELECT 
        us.id,
        name,
        COUNT(ur."linksCount") AS "linksCount",
        COALESCE(SUM(ur."visitCount"), 0) AS "visitCount"
      FROM users us
      LEFT JOIN urls ur
      ON ur."userId" = us.id
      GROUP BY us.id
      ORDER BY "visitCount" DESC
      LIMIT 10
      `
    );

    res.status(200).send(ranking);
    
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export { rankingViews };
