import express, { type Request, type Response } from 'express'

import dotenv from 'dotenv';

const app = express();

console.log(process.env.PORT);
dotenv.config();

app.get('/', (req:Request, res:Response) => {
 res.json({
    db: process.env.PORT
 })
})

app.listen(process.env.PORT)



// if u r using secret then import like this 
// require("dotenv").config({
//     file:"./secret/.env"
// })