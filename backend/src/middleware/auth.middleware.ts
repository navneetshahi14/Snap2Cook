import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../config/jwt.ts";


export const authMiddleware = async( req:Request,res:Response,next:NextFunction ) =>{
    try{

        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message:"No token provided"});
        }

        const token = authHeader.split(" ")[1];

        const user = verifyJwt(token);
        (req as any).user = user;

        next();
        
    }catch(err:any){
        console.log("Error message :--> ",err.message);
        throw new Error("Invalid Token")
    }
}