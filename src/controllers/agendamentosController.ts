import { Request, Response } from "express";
import * as agendamentosService from "../services/agendamentoService";

export const listar = async (req: Request, res: Response) => {
  try {
    const usuario_id = (req as any).usuario.id;
    const agendamentos = await agendamentosService.listar(usuario_id);
    res.json(agendamentos);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao listar agendamentos" });
  }
};

export const criar = async (req: Request, res: Response) => {
  try {
    const { cliente_id, data, hora, servico } = req.body;
    const usuario_id = (req as any).usuario.id;

    if (!cliente_id || !data || !hora || !servico) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    const novo = await agendamentosService.criar(cliente_id, data, hora, servico, usuario_id);

    if (!novo) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    res.status(201).json(novo);
  } catch (erro) {
    console.log("ERRO AGENDAMENTO:", erro);
    res.status(500).json({ erro: "Erro ao criar agendamento" });
  }
};

export const excluir = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario_id = (req as any).usuario.id;

    const removido = await agendamentosService.excluir(Number(id), usuario_id);

    if (!removido) {
      return res.status(404).json({ erro: "Agendamento não encontrado" });
    }

    res.json({ mensagem: "Agendamento cancelado", agendamento: removido });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao excluir agendamento" });
  }
};