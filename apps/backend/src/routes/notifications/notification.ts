import { Router } from "express";

export const notificationRoutes = Router();

notificationRoutes.get('/',(req,res)=>{
    res.json({
        msg : "notification logging"
    })
})