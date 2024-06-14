import { Router } from "express";
import * as sensorsController from "../controllers/sensorsController";
import { validate } from "../middlewares/validate";
import { sensorSchema } from "../schemas/sensor";

const router = Router();

router.post('/', validate(sensorSchema), sensorsController.createSensor);
router.get('/:id', sensorsController.getSensor);

export default router;
