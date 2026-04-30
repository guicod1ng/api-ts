import prisma from "../config/prisma";

export const listar = async (usuario_id: number) => {
  return prisma.clientes.findMany({
    where: { usuario_id },
    orderBy: { id: "asc" },
  });
};

export const criar = async (nome: string, telefone: string, usuario_id: number) => {
  return prisma.clientes.create({
    data: { nome, telefone, usuario_id },
  });
};

export const atualizar = async (id: number, nome: string, telefone: string, usuario_id: number) => {
  return prisma.clientes.updateMany({
    where: { id, usuario_id },
    data: { nome, telefone },
  });
};

export const deletar = async (id: number, usuario_id: number) => {
  return prisma.clientes.deleteMany({
    where: { id, usuario_id },
  });
};