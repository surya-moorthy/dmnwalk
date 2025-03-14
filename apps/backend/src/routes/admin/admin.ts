import { Router } from "express";

export const adminroutes = Router();

adminroutes.get('/',(req,res)=>{
    res.json({
        msg : "admin logging"
    })
})