import { Request, Response } from "express";
import { db } from "../config/db.js";
import { favoritesTable } from "../db/schema.js";
import { and, eq } from "drizzle-orm";

export const saveFavorites = async(req:Request,res:Response) =>{
    const userId = req.user?.id;
    const { recipeId,title,image,cookTime,servings } = req.body;

    if(!userId){
        return res.status(400).json({error:"User is Unauthorized"});
    }

    if(!recipeId || !title ){
        return res.status(404).json({
            error:"Please fill all the fields"
        })
    }

    const recipeIdNum = parseInt(recipeId);
    try{

        const savingFav = await db.insert(favoritesTable).values({
            userId,recipeId:recipeIdNum,title,image,cookTime,servings
        }).returning();

        return res.status(200).json({
            message:"Add to Favorites",
            favorites:savingFav[0]
        })

    }catch(err:any){
        console.log(err.message);
        return res.status(500).json({error:"Internal Server Error"});
    }
}


export const deleteFavorites = async(req:Request,res:Response) =>{
    const userId = req.user?.id;
    const {recipeId} = req.params;

    if(!userId) return res.status(401).json({error:"Unauthorized"});
    if(!recipeId) return res.status(404).json({error:"RecipeId is Required"});

    const recipeIdNum = parseInt(recipeId);
    try{

        await db.delete(favoritesTable).where(and(eq(favoritesTable.userId,userId), eq(favoritesTable.id,recipeIdNum))); 

        return res.status(200).json({message:"deleted Successfully"});

    }catch(err:any){
        console.log(err.message);
        return res.status(500).json({error:"Internal Server Error"});
    }
}

export const allFavorites = async(req:Request,res:Response) =>{
    const userId = req.user?.id;
    
    if(!userId) return res.status(401).json({error:"Unauthorized"});

    try{

        const data = await db.select().from(favoritesTable).where(eq(favoritesTable.userId,userId));

        res.status(200).json(data);

    }catch(err:any){
        console.log(err.message);
        return res.status(500).json({error:"Internal Server Error"});
    }
}