import { Router } from "express";
import * as availabilitiesController from "../controllers/availabilitiesController";
import { validate } from "../middlewares/validate";
import { availabilitySchema } from "../schemas/availability";

const router = Router();

router.post('/', validate(availabilitySchema), availabilitiesController.createAvailability);
router.delete('/:id', availabilitiesController.deleteAvailability);

export default router;
