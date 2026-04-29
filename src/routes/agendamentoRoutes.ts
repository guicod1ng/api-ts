import { Router } from "express";
import * as agendamentosController from "../controllers/agendamentosController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, agendamentosController.listar);
router.post("/", authMiddleware, agendamentosController.criar);
router.delete("/:id", authMiddleware, agendamentosController.excluir);

export default router;