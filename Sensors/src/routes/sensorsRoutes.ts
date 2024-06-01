import { Router } from "express";
import * as sensorsController from "../controllers/sensorsController";

const router = Router();

router.post('/sensors', sensorsController.createSensor);

export default router;
