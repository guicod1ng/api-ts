"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.criar = exports.listar = void 0;
const db_1 = __importDefault(require("../config/db"));
const listar = async (usuario_id) => {
    const resultado = await db_1.default.query("SELECT * FROM clientes WHERE usuario_id = $1 ORDER BY id", [usuario_id]);
    return resultado.rows;
};
exports.listar = listar;
const criar = async (nome, telefone, usuario_id) => {
    const resultado = await db_1.default.query("INSERT INTO clientes (nome, telefone, usuario_id) VALUES ($1, $2, $3) RETURNING *", [nome, telefone, usuario_id]);
    return resultado.rows[0];
};
exports.criar = criar;
