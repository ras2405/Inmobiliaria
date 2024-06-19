import { Router } from "express";
import * as availabilitiesController from "../controllers/availabilitiesController";
import { validate } from "../middlewares/validate";
import { availabilitySchema } from "../schemas/availability";
import { authMiddleware } from "../middlewares/roleAuth";

const router = Router();

router.post(
    '/',
    validate(availabilitySchema),
    authMiddleware('Owner'),
    availabilitiesController.createAvailability
);
router.delete('/:id', availabilitiesController.deleteAvailability);

export default router;
