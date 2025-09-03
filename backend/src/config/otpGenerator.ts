import nodemailer from 'nodemailer';
import { ENV } from './env.js';

export const OtpGenerator = (length: number = 6, useAlphanumeric: boolean = false): string => {

    const digits = "0123456789";
    const alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const characters = useAlphanumeric ? alphanumeric : digits;

    let otp = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        otp += characters[randomIndex];
    }

    return otp;
}


export const sendOtp = async (toEmail: string, otp:string, length: number = 6): Promise<void> => {

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: ENV.USER,
            pass: ENV.PASS
        }
    })

    const mailOption = {
        from: `"Snap2Cook" <${ENV.USER}>`,
        to: toEmail,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}`,
        html: `<h2>Your OTP code is: <b>${otp}</b></h2> <p>This code is valid for 5 minutes.</p>`,
    }

    try{
        await transport.sendMail(mailOption);
        console.log(`OTP sent to ${toEmail}: ${otp}`);
    }catch(err:any){
        console.log(err.message);
        throw err;
    }
}