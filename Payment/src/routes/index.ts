import { Router } from "express";
import paymentsRoutes from "./paymentsRoutes";

const router = Router();

router.use('/payments', paymentsRoutes);

export default router;
