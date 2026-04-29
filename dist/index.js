"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const clientesRoutes_1 = __importDefault(require("./routes/clientesRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const agendamentoRoutes_1 = __importDefault(require("./routes/agendamentoRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", authRoutes_1.default);
app.use("/agendamentos", agendamentoRoutes_1.default);
app.get("/ping", (req, res) => {
    res.json({ status: "online" });
});
app.use("/clientes", clientesRoutes_1.default);
const PORTA = process.env.PORTA || 3003;
app.listen(PORTA, () => {
    console.log(`✅ Servidor rodando na porta ${PORTA}`);
});
