import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export interface JWTPayload {
    id: number,
    email: string,
    iat?: number,
    exp?: number
}

export const generateJWT = async (id: string, email: string) => {

    try {

        return jwt.sign({ id, email }, ENV.SECRETKEY as string, {
            expiresIn: '3d'
        })

    } catch (err: any) {
        console.log("Error message :-->", err.message);
        throw new Error("Internal Server Error");
    }

}

export const verifyJwt = (token: string) => {
    try {

        const decoded = jwt.verify(token, ENV.SECRETKEY as string) as JWTPayload;
        return { id: decoded.id, email: decoded.email };

    } catch (err: any) {
        console.log("Error message:--> ", err.message);
        throw new Error("Unauthorized");
    }
}

export const generateJWTOTP = async (email: string, otp: string) => {
    try {

        return jwt.sign({ email,otp }, ENV.SECRETKEY as string, {
            expiresIn: '10min'
        })

    } catch (err: any) {
        console.log("Error message :-->", err.message);
        throw new Error("Internal Server Error");
    }
}

interface OTPJwtPayload{
    otp: string,
    email: string,
    iat?: number,
    exp?: number
}

export const verifyJWTOtp = (token:string,otp:string,email:string) => {
    try{
        const decoded = jwt.verify(token,ENV.SECRETKEY as string) as OTPJwtPayload
        return decoded.email == email && decoded.otp == otp
    }catch{
        return false;
    }
}