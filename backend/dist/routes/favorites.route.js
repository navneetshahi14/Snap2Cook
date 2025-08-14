import { Router } from "express";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { saveFavorites } from "../controller/favorites.controller.js";
const router = Router();
router.post('/save', authmiddleware, saveFavorites);
export default router;
