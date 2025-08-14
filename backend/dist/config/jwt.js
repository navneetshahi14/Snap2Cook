import jwt from 'jsonwebtoken';
import { ENV } from './env.js';
export const generateJWT = async (id, email) => {
    try {
        return jwt.sign({ id, email }, ENV.SECRETKEY, {
            expiresIn: '3d'
        });
    }
    catch (err) {
        console.log("Error message :-->", err.message);
        throw new Error("Internal Server Error");
    }
};
export const verifyJwt = (token) => {
    try {
        const decoded = jwt.verify(token, ENV.SECRETKEY);
        return { id: decoded.id, email: decoded.email };
    }
    catch (err) {
        console.log("Error message:--> ", err.message);
        throw new Error("Unauthorized");
    }
};
