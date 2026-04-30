import request from "supertest";
import express from "express";

const app = express();
app.get("/ping", (req, res) => {
  res.json({ status: "online" });
});

describe("GET /ping", () => {
  it("deve retornar status online", async () => {
    const resposta = await request(app).get("/ping");
    expect(resposta.status).toBe(200);
    expect(resposta.body.status).toBe("online");
  });
});