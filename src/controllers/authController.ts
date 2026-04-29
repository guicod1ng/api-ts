import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usuariosService from "../services/usuariosService";

const JWT_SECRET = "uma_frase_secreta_bem_longa_e_aleatoria_123";

export const registrar = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    const existe = await usuariosService.buscarPorEmail(email);
    if (existe) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novo = await usuariosService.criar(email, senhaHash);

    res.status(201).json({ mensagem: "Usuário criado", usuario: novo });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao registrar" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    const usuario = await usuariosService.buscarPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ mensagem: "Login realizado", token });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
};