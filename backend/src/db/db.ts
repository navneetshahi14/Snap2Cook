import {Pool} from 'pg';
import { ENV } from '../config/env.js';

const pool = new Pool({
    user:ENV.USERNAME,
    host:ENV.HOST,
    password:ENV.PASSWORD,
    database:ENV.DATABASE,
    port:parseInt(ENV.DBPORT as string)
})

pool.connect().then(()=>{
    console.log("Connected the postgres Database");
}).catch(err =>{
    console.log("❌ Connection error", err)
})

export default pool