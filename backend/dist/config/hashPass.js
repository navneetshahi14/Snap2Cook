import bcrypt from 'bcrypt';
export const hashPass = async (password) => {
    try {
        return bcrypt.hash(password, 10);
    }
    catch (err) {
        console.log("Error message:->> ", err.message);
        throw new Error("Internal Server Error");
    }
};
export const verifyPass = async (pass, originalPass) => {
    try {
        return bcrypt.compare(pass, originalPass);
    }
    catch (err) {
        console.log("Error message:--> ", err.message);
        throw new Error("Internal Server Error");
    }
};
