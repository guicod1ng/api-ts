"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluir = exports.criar = exports.listar = void 0;
const db_1 = __importDefault(require("../config/db"));
const listar = async (usuario_id) => {
    const resultado = await db_1.default.query(`SELECT a.*, c.nome AS cliente_nome
     FROM agendamentos a
     JOIN clientes c ON a.cliente_id = c.id
     WHERE c.usuario_id = $1
     ORDER BY a.data, a.hora`, [usuario_id]);
    return resultado.rows;
};
exports.listar = listar;
const criar = async (cliente_id, data, hora, servico, usuario_id) => {
    const resultado = await db_1.default.query(`INSERT INTO agendamentos (cliente_id, data, hora, servico)
     SELECT $1, $2, $3, $4
     FROM clientes
     WHERE id = $1 AND usuario_id = $5
     RETURNING *`, [cliente_id, data, hora, servico, usuario_id]);
    return resultado.rows[0] || null;
};
exports.criar = criar;
const excluir = async (id, usuario_id) => {
    const resultado = await db_1.default.query(`DELETE FROM agendamentos a
     USING clientes c
     WHERE a.cliente_id = c.id
       AND a.id = $1
       AND c.usuario_id = $2
     RETURNING a.*`, [id, usuario_id]);
    return resultado.rows[0] || null;
};
exports.excluir = excluir;
