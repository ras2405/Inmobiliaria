import { Router } from "express";
import { validateParams } from "../middlewares/validateParams";
import { earningsSchema } from "../schemas/earnings";
import * as reportsController from '../controllers/reportsController';

const router = Router();

router.get('/:id/earnings',validateParams(earningsSchema),reportsController.getEarnings);

export default router;
