import { Router } from "express";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { allFavorites, deleteFavorites, saveFavorites } from "../controller/favorites.controller.js";

const router = Router();


router.post('/save',authmiddleware,saveFavorites);
router.delete('/:recipeId',authmiddleware,deleteFavorites);
router.get('/',authmiddleware,allFavorites);


export default router;