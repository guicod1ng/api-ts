import request from "supertest";
import app from "../index";

let token: string;

beforeAll(async () => {
  const resposta = await request(app)
    .post("/auth/login")
    .send({ email: "ts@email.com", senha: "123456" });

  token = resposta.body.token;
});

describe("GET /clientes", () => {
  it("deve retornar 401 sem token", async () => {
    const resposta = await request(app).get("/clientes");
    expect(resposta.status).toBe(401);
  });

  it("deve listar clientes com token válido", async () => {
    const resposta = await request(app)
      .get("/clientes")
      .set("Authorization", `Bearer ${token}`);

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
  });
});

describe("POST /clientes", () => {
  it("deve criar um cliente com token válido", async () => {
    const resposta = await request(app)
      .post("/clientes")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Cliente Teste", telefone: "11999999999" });

    expect(resposta.status).toBe(201);
    expect(resposta.body.nome).toBe("Cliente Teste");
  });

  it("deve retornar 400 sem nome ou telefone", async () => {
    const resposta = await request(app)
      .post("/clientes")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "" });

    expect(resposta.status).toBe(400);
  });
});