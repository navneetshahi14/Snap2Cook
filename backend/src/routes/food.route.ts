import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.ts';
import { deleteFavorites, fetchAllFavorites, saveFavorites } from '../controller/food.controller.ts';
const router = express.Router();


router.post('/saveFavorites',authMiddleware,saveFavorites);
router.delete('/deleteFavorites/:recipeId',authMiddleware,deleteFavorites);
router.get('/favorites',authMiddleware,fetchAllFavorites);


export default router;