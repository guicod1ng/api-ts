import pool from "../config/db";
import { Cliente } from "../models/clientes";

export const listar = async (usuario_id: number): Promise<Cliente[]> => {
  const resultado = await pool.query(
    "SELECT * FROM clientes WHERE usuario_id = $1 ORDER BY id",
    [usuario_id]
  );
  return resultado.rows;
};

export const criar = async (
  nome: string,
  telefone: string,
  usuario_id: number
): Promise<Cliente> => {
  const resultado = await pool.query(
    "INSERT INTO clientes (nome, telefone, usuario_id) VALUES ($1, $2, $3) RETURNING *",
    [nome, telefone, usuario_id]
  );
  return resultado.rows[0];
};