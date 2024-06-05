import { Router } from "express";
import { validate } from "../../../src/middlewares/validate";
import * as sensorsController from "../controllers/sensorsController";
import { sensorSchema } from "../schemas/sensor";

const router = Router();

router.post('/sensors', validate(sensorSchema), sensorsController.createSensor);

export default router;
