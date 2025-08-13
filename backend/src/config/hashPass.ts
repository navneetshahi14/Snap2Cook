import bcrypt from 'bcrypt';

export const hashPass = async(password:string):Promise<string> => {
    try{

        return bcrypt.hash(password,10);

    }catch(err:any){
        console.log("Error message:->> ",err.message);
        throw new Error("Internal Server Error");
    }
}


export const verifyPass = async(pass:string,originalPass:string):Promise<boolean> =>{
    try{

        return bcrypt.compare(pass,originalPass);

    }catch(err:any){
        console.log("Error message:--> ",err.message);
        throw new Error("Internal Server Error");
    }
}