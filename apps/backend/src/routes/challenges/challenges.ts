import { Router } from "express";

export const challengesRoutes = Router();

challengesRoutes.get('/',(req,res)=>{
    res.json({
        msg : "challenges logging"
    })
})

