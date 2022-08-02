import { connection } from "../database/postgres.js";
import bcrypt from "bcrypt";

async function signUpUsers(req, res) {
  const { name, email, password } = req.body;

  try {
    const { rowCount } = await connection.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (rowCount === 1) return res.sendStatus(409);

    const encryptedPassword = bcrypt.hashSync(password, 10);

    await connection.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)`,
      [name, email, encryptedPassword]
    );

    res.sendStatus(201);

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export { signUpUsers };
