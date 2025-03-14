import { Router } from "express";

export const transactionRoutes = Router();

transactionRoutes.get('/',(req,res)=>{
    res.json({
        msg : "transaction logging"
    })
})