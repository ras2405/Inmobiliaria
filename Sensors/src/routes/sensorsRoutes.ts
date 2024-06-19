import { Router } from "express";
import * as sensorsController from "../controllers/sensorsController";
import { validate } from "../middlewares/validate";
import { sensorSchema } from "../schemas/sensor";
import { authMiddleware } from "../../../Main/src/middlewares/roleAuth";

const router = Router();

router.post(
    '/',
    validate(sensorSchema),
    authMiddleware('Admin'),
    sensorsController.createSensor
);
router.get('/:id', sensorsController.getSensor);

export default router;
