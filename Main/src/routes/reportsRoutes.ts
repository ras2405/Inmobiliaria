import { Router } from "express";
import { validateParams } from "../middlewares/validateParams";
import { earningsSchema } from "../schemas/earnings";

const router = Router();

router.get('/earnings',validateParams(earningsSchema));

export default router;
