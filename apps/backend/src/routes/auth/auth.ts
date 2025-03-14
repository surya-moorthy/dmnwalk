import { Router } from "express";
const client = require("@repo/db");
export const authRoutes = Router();


authRoutes.get('/register',async (req,res)=>{
   const {username , password , email} = req.body;
   res.json({
    msg : client
   })
})