import { NextFunction, Router, Response } from "express";
import * as availabilitiesController from "../controllers/availabilitiesController";
import { validate } from "../middlewares/validate";
import { availabilitySchema } from "../schemas/availability";
import { authenticateToken, CustomRequest } from "../middlewares/roleAuth";

const router = Router();

const authMiddleware = (role: string) => (req: CustomRequest, res: Response, next: NextFunction) =>
    authenticateToken(req, res, next, role);

router.post(
    '/',
    validate(availabilitySchema),
    authMiddleware('Owner'),
    availabilitiesController.createAvailability
);
router.delete('/:id', availabilitiesController.deleteAvailability);

export default router;
