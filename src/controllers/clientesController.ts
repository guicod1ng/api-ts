import { Request, Response } from "express";
import * as clientesService from "../services/clientesService";

export const listar = async (req: Request, res: Response) => {
  try {
    const usuario_id = (req as any).usuario.id;
    const clientes = await clientesService.listar(usuario_id);
    res.json(clientes);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao listar clientes" });
  }
};

export const criar = async (req: Request, res: Response) => {
  try {
    const { nome, telefone } = req.body;
    const usuario_id = (req as any).usuario.id;

    if (!nome || !telefone) {
      return res.status(400).json({ erro: "Nome e telefone são obrigatórios" });
    }

    const novo = await clientesService.criar(nome, telefone, usuario_id);
    res.status(201).json(novo);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao salvar cliente" });
  }
};