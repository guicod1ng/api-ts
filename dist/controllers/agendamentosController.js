"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluir = exports.criar = exports.listar = void 0;
const agendamentosService = __importStar(require("../services/agendamentoService"));
const listar = async (req, res) => {
    try {
        const usuario_id = req.usuario.id;
        const agendamentos = await agendamentosService.listar(usuario_id);
        res.json(agendamentos);
    }
    catch (erro) {
        res.status(500).json({ erro: "Erro ao listar agendamentos" });
    }
};
exports.listar = listar;
const criar = async (req, res) => {
    try {
        const { cliente_id, data, hora, servico } = req.body;
        const usuario_id = req.usuario.id;
        if (!cliente_id || !data || !hora || !servico) {
            return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
        }
        const novo = await agendamentosService.criar(cliente_id, data, hora, servico, usuario_id);
        if (!novo) {
            return res.status(404).json({ erro: "Cliente não encontrado" });
        }
        res.status(201).json(novo);
    }
    catch (erro) {
        res.status(500).json({ erro: "Erro ao criar agendamento" });
    }
};
exports.criar = criar;
const excluir = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario_id = req.usuario.id;
        const removido = await agendamentosService.excluir(Number(id), usuario_id);
        if (!removido) {
            return res.status(404).json({ erro: "Agendamento não encontrado" });
        }
        res.json({ mensagem: "Agendamento cancelado", agendamento: removido });
    }
    catch (erro) {
        res.status(500).json({ erro: "Erro ao excluir agendamento" });
    }
};
exports.excluir = excluir;
