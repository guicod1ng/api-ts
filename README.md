🚀 API de Clientes

API REST desenvolvida com TypeScript, utilizando Prisma ORM, autenticação com JWT e integração com PostgreSQL.

Projeto focado em organização de código, separação de responsabilidades e boas práticas de desenvolvimento back-end.

⚙️ Stack
TypeScript
Node.js
Express
Prisma ORM
PostgreSQL (Neon)
JWT + bcrypt
Jest + Supertest
Docker

📌 Features
Autenticação JWT (login e registro)
CRUD de clientes
CRUD de agendamentos
Hash de senha com bcrypt
Testes automatizados
Arquitetura em camadas (controller/service)

🌐 Production
https://api-ts-xlri.onrender.com


🧱 Project Structure
src/
  controllers/
  services/
  routes/
  middlewares/
  database/
tests/

▶️ Running Locally
npm install
npx prisma generate
npm test
npm start

🧪 Tests
npm test
11 test cases
auth
clients
appointments

🐳 Docker
docker compose up --build

📌 Status
production-ready

👨‍💻 Author

Guilherme
