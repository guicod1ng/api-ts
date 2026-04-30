import request from "supertest";
import app from "../index";

let token: string;

beforeAll(async () => {
  const resposta = await request(app)
    .post("/auth/login")
    .send({ email: "ts@email.com", senha: "123456" });

  token = resposta.body.token;
});

describe("POST /agendamentos", () => {
  it("deve criar agendamento", async () => {
    const cliente = await request(app)
      .post("/clientes")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Cliente Teste", telefone: "11999999999" });

    const cliente_id = cliente.body.id;

    const resposta = await request(app)
      .post("/agendamentos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        cliente_id,
        data: "2026-05-01",
        hora: "14:00",
        servico: "Corte",
      });

    expect(resposta.status).toBe(201);
  });

  it("deve recusar campos faltando", async () => {
    const resposta = await request(app)
      .post("/agendamentos")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(resposta.status).toBe(400);
  });
});