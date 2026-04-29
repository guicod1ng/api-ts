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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registrar = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuariosService = __importStar(require("../services/usuariosService"));
const JWT_SECRET = "uma_frase_secreta_bem_longa_e_aleatoria_123";
const registrar = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ erro: "Email e senha são obrigatórios" });
        }
        const existe = await usuariosService.buscarPorEmail(email);
        if (existe) {
            return res.status(400).json({ erro: "Email já cadastrado" });
        }
        const senhaHash = await bcrypt_1.default.hash(senha, 10);
        const novo = await usuariosService.criar(email, senhaHash);
        res.status(201).json({ mensagem: "Usuário criado", usuario: novo });
    }
    catch (erro) {
        res.status(500).json({ erro: "Erro ao registrar" });
    }
};
exports.registrar = registrar;
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ erro: "Email e senha são obrigatórios" });
        }
        const usuario = await usuariosService.buscarPorEmail(email);
        if (!usuario) {
            return res.status(401).json({ erro: "Email ou senha inválidos" });
        }
        const senhaValida = await bcrypt_1.default.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ erro: "Email ou senha inválidos" });
        }
        const token = jsonwebtoken_1.default.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: "1d" });
        res.json({ mensagem: "Login realizado", token });
    }
    catch (erro) {
        res.status(500).json({ erro: "Erro ao fazer login" });
    }
};
exports.login = login;
