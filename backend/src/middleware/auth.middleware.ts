import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../config/jwt.js";

export const authmiddleware = async (req:Request,res:Response,next:NextFunction) =>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(404).json({error:"Token is required"});

    try{

        const decoded = verifyJwt(token);
        req.user = decoded;
        next();

    }catch(err:any){
        console.log(err.message);
        return res.status(400).json({error:"Something went wrong with your authorization"});
    }
}