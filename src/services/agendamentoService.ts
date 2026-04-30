import prisma from "../config/prisma";

export const listar = async (usuario_id: number) => {
  return prisma.agendamentos.findMany({
    where: { clientes: { usuario_id } },
    include: { clientes: { select: { nome: true } } },
    orderBy: [{ data: "asc" }, { hora: "asc" }],
  });
};

export const criar = async (cliente_id: number, data: string, hora: string, servico: string, usuario_id: number) => {
  const cliente = await prisma.clientes.findFirst({
    where: { id: cliente_id, usuario_id },
  });

  if (!cliente) return null;

  return prisma.agendamentos.create({
    data: { 
      cliente_id,
       data: new Date(data),
       hora: new Date(`1970-01-01T${hora}:00`), 
       servico 
      },
  });
};

export const excluir = async (id: number, usuario_id: number) => {
  const agendamento = await prisma.agendamentos.findFirst({
    where: { id, clientes: { usuario_id } },
  });

  if (!agendamento) return null;

  return prisma.agendamentos.delete({ where: { id } });
};