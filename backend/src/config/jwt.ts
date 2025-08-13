import jwt from 'jsonwebtoken';
import { ENV } from './env.ts';

interface JWTPayload {
    id: string,
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

export const verifyJwt = (token:string):JWTPayload =>{
    try{

        const decoded = jwt.verify(token,ENV.SECRETKEY as string) as JWTPayload;
        return decoded;

    }catch(err:any){
        console.log("Error message:--> ",err.message);
        throw new Error("Unauthorized");
    }
}