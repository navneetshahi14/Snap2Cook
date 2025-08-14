import "dotenv/config";
export const ENV = {
    PORT: process.env.PORTNO,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    USERNAME: process.env.UserName,
    HOST: process.env.HOST,
    DATABASE: process.env.DATABASE,
    PASSWORD: process.env.PASSWORD,
    DBPORT: process.env.PORT,
    SECRETKEY: process.env.SECRET_KEY
};
