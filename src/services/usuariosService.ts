import prisma from "../config/prisma";

export const buscarPorEmail = async (email: string) => {
  return prisma.usuarios.findUnique({ where: { email } });
};

export const criar = async (email: string, senhaHash: string) => {
  return prisma.usuarios.create({
    data: { email, senha: senhaHash },
    select: { id: true, email: true },
  });
};