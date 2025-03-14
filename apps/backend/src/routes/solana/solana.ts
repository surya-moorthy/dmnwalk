import { Router } from "express";

export const solanaRoutes = Router();

solanaRoutes.get('/',(req,res)=>{
    res.json({
        msg : "solana logging"
    })
})