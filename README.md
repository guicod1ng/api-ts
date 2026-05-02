# 🚀 API de Clientes - TypeScript + Prisma

API REST completa com TypeScript, Prisma ORM, autenticação JWT e testes automatizados.

## 🛠 Stack

| Tecnologia | Uso |
|-----------|-----|
| TypeScript | Linguagem |
| Express | Servidor HTTP |
| Prisma | ORM |
| PostgreSQL (Neon) | Banco de dados |
| JWT + bcrypt | Autenticação |
| Jest + Supertest | Testes |
| Docker | Containerização |
| Render | Deploy |

## 📦 Rodar Local

```bash
npm install
npx prisma generate
npm test
npm start

## 🌐 Deploy
Disponível em: https://api-ts-xlri.onrender.com

✅ Testes
bash
npm test

🐳 Docker
bash
docker compose up --build
