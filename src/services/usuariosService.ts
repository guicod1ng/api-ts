import pool from "../config/db";
import { Usuario } from "../models/usuarios";

export const buscarPorEmail = async (email: string): Promise<Usuario | null> => {
  const resultado = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
  return resultado.rows[0] || null;
};

export const criar = async (email: string, senhaHash: string): Promise<Usuario> => {
  const resultado = await pool.query(
    "INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING id, email",
    [email, senhaHash]
  );
  return resultado.rows[0];
};