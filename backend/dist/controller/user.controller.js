import { db } from '../config/db.js';
import { UsersTable } from '../db/schema.js';
import { generateJWT } from '../config/jwt.js';
import { hashPass, verifyPass } from '../config/hashPass.js';
import { eq } from 'drizzle-orm';
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(404).json({ message: "Please Fill all the fields" });
            throw new Error("please fill all the fields");
        }
        const hashedPass = await hashPass(password);
        const [newUser] = await db.insert(UsersTable).values({
            userName: username,
            email,
            password: hashedPass
        }).returning({ id: UsersTable.id, email: UsersTable.email });
        const token = await generateJWT(newUser.id.toString(), newUser.email);
        return res.status(200).json({ message: "User created successfully", token, user: newUser });
    }
    catch (err) {
        console.log("Error message :->> ", err.message);
        throw Error("Internal Server Error");
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ message: "Please fill all the fields" });
        }
        const [user] = await db.select().from(UsersTable).where(eq(UsersTable.email, email));
        if (!user)
            return res.status(404).json({ message: "User Not Found" });
        const isPass = await verifyPass(password, user.password);
        if (!isPass) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        const token = await generateJWT(user.id.toString(), user.email);
        return res.status(200).json({
            message: "Login Successful",
            token,
            user: { id: user.id, name: user.userName, email: user.email }
        });
    }
    catch (err) {
        console.log("Error message:--> ", err.message);
        throw new Error("Internal Server Error");
    }
};
// password reset
// email verification
// refresh token and access token 
// rate limiting
// role based access
// Blacklist/Whitelist Tokens
// Encrypt Sensitive User Data (phone, address, etc.) in DB.
