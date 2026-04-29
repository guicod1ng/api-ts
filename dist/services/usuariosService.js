"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.criar = exports.buscarPorEmail = void 0;
const db_1 = __importDefault(require("../config/db"));
const buscarPorEmail = async (email) => {
    const resultado = await db_1.default.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    return resultado.rows[0] || null;
};
exports.buscarPorEmail = buscarPorEmail;
const criar = async (email, senhaHash) => {
    const resultado = await db_1.default.query("INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING id, email", [email, senhaHash]);
    return resultado.rows[0];
};
exports.criar = criar;
