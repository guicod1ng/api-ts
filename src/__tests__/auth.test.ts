import request from "supertest";
import app from "../index";

describe("POST /auth/registro", () => {
  it("deve criar um usuário com sucesso", async () => {
    const resposta = await request(app)
      .post("/auth/registro")
      .send({
        email: `teste${Date.now()}@email.com`,
        senha: "123456",
      });

    expect(resposta.status).toBe(201);
    expect(resposta.body.mensagem).toBe("Usuário criado");
  });

 it("deve recusar email duplicado", async () => {
  const email = `dup${Date.now()}@email.com`;

  const resposta = await request(app)
    .post("/auth/registro")
    .send({ email, senha: "123456" });

  expect(resposta.status).toBe(201);

  const duplicata = await request(app)
    .post("/auth/registro")
    .send({ email, senha: "123456" });

  expect(duplicata.status).toBe(400);
  expect(duplicata.body.erro).toContain("cadastrado");
});

});

describe("POST /auth/login", () => {
  it("deve fazer login e retornar token", async () => {
    const resposta = await request(app)
      .post("/auth/login")
      .send({
        email: "duplicado@email.com",
        senha: "123456",
      });

    expect(resposta.status).toBe(200);
    expect(resposta.body.token).toBeDefined();
  });

  it("deve recusar senha errada", async () => {
    const resposta = await request(app)
      .post("/auth/login")
      .send({
        email: "duplicado@email.com",
        senha: "errada",
      });

    expect(resposta.status).toBe(401);
  });
});