import { Router } from "express";
import * as clientesController from "../controllers/clientesController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, clientesController.listar);
router.post("/", authMiddleware, clientesController.criar);

export default router;