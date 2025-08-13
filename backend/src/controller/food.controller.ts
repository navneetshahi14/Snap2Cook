import { Request, Response } from "express";
import { db } from "../config/db.ts";
import { favoritesTable } from "../db/schema.ts";
import { and, eq } from "drizzle-orm";

export const saveFavorites = async(req:Request,res:Response) =>{
    try{

        const userId = req.user?.id

        const {recipeId,title,image,cookTime,servings} = req.body

        if(!userId || !recipeId || !title ){
            return res.status(404).json({
                message:"Missing fields are required"
            });
        }

        const newFavorites = await db.insert(favoritesTable).values({
            userId,
            recipeId,
            title,
            image,
            cookTime,
            servings
        }).returning()

        res.status(200).json({message:"Added to favorites",favorites:newFavorites[0]});
    }catch(err:any){
        console.log("Error message :--> ",err.message);
        throw new Error("Internal Server error");
    }
}

export const deleteFavorites = async(req:Request,res:Response) =>{
    try{

        const userId = req.user?.id!;
        const { recipeId } = req.params;

        if(!userId || !recipeId ){
            return res.status(404).json({message:"Please fill all the fields"});
        }

        await db.delete(favoritesTable).where(
            and(eq(favoritesTable.userId,userId), eq(favoritesTable.recipeId,parseInt(recipeId)))
        )

        res.status(200).json({message:"Favorites deleted successfully"});
    }catch(err:any) {
        console.log("Error message:-> ",err.message);
        throw new Error("Internal Server Error");
    }
}

export const fetchAllFavorites = async(req:Request,res:Response) =>{
    try{
        
        const userId = req.user?.id;

        if(!userId) return res.status(404).json({message:"Please fill all the fields"});

        const allFavorites = await db.select().from(favoritesTable).where(eq(favoritesTable.userId,userId));

        res.status(200).json({favorites:allFavorites});

    }catch(err:any){
        console.log("Error message:-> ",err.message);
        throw new Error("Internal Server Error");
    }
}