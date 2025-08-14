import { db } from "../config/db.js";
import { favoritesTable } from "../db/schema.js";
export const saveFavorites = async (req, res) => {
    const userId = req.user?.id;
    const { recipeId, title, image, cookTime, servings } = req.body;
    if (!userId) {
        return res.status(400).json({ error: "User is Unauthorized" });
    }
    if (!recipeId || !title) {
        return res.status(404).json({
            error: "Please fill all the fields"
        });
    }
    try {
        const savingFav = await db.insert(favoritesTable).values({
            userId, recipeId, title, image, cookTime, servings
        }).returning();
        return res.status(200).json({
            message: "Add to Favorites",
            favorites: savingFav[0]
        });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
