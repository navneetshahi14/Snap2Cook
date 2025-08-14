import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export interface JWTPayload {
    id: number,
    email: string,
    iat?: number,
    exp?: number
}

export const generateJWT = async(id:string,email:string) =>{

    try{

        return jwt.sign({id,email},ENV.SECRETKEY as string,{
            expiresIn:'3d'
        })

    }catch(err:any){
        console.log("Error message :-->",err.message);
        throw new Error("Internal Server Error");
    }
    
}

export const verifyJwt = (token:string) =>{
    try{

        const decoded = jwt.verify(token,ENV.SECRETKEY as string) as JWTPayload;
        return {id:decoded.id,email:decoded.email};

    }catch(err:any){
        console.log("Error message:--> ",err.message);
        throw new Error("Unauthorized");
    }
}