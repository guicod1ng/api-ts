import express from "express";
import cors from "cors";
import clientesRoutes from "./routes/clientesRoutes";
import authRoutes from "./routes/authRoutes";
import agendamentosRoutes from "./routes/agendamentoRoutes";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/agendamentos", agendamentosRoutes);


app.get("/ping", (req, res) => {
  res.json({ status: "online" });
});

app.use("/clientes", clientesRoutes);

const PORTA = process.env.PORTA || 3003;
app.listen(PORTA, () => {
  console.log(`✅ Servidor rodando na porta ${PORTA}`);
});