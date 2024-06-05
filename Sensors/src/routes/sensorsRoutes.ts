import { Router } from "express";
import * as sensorsController from "../controllers/sensorsController";
import { validate } from "../middlewares/validate";
import { sensorSchema } from "../schemas/sensor";

const router = Router();

router.post('/sensors', validate(sensorSchema), sensorsController.createSensor);

export default router;
