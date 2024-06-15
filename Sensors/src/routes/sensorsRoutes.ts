import { Router } from "express";
import * as sensorsController from "../controllers/sensorsController";
import { validate } from "../middlewares/validate";
import { sensorSchema } from "../schemas/sensor";
import { sensorValueSchema } from "../schemas/sensorValue";

const router = Router();

router.post('/', validate(sensorSchema), sensorsController.createSensor);
router.post('/alerts', validate(sensorValueSchema), sensorsController.analyzeSensorValue);
router.get('/:id', sensorsController.getSensor);

export default router;
