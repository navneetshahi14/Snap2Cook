import dotenv from 'dotenv';
dotenv.config({quiet:true});
import express from 'express';
import { ENV } from './config/env.ts';
import UserRouter from './routes/user.route.ts';
import FavoritesRouter from './routes/food.route.ts';
import job from './config/cron.ts';


const app = express();
const PORT = ENV.PORT || 5001

if(ENV.NODE_ENV === "production") job.start();

app.use(express.json());

app.use('/api/auth',UserRouter);
app.use('/api/favorites',FavoritesRouter);

app.get('/',(req,res)=>{
    res.status(200).json({success:true}) 
})

app.listen(PORT,()=>{
    console.log(`Server Running at Port No. :=> ${PORT}`)
})