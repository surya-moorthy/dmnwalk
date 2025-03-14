import { Router } from "express";
import bcrypt from "bcrypt";
export const authRoutes = Router();
import { LoginBody, RegisterBody } from "../../types/types.js";
import { prisma } from "@repo/db";

authRoutes.post('/register',async (req,res)=>{
   const {success} = RegisterBody.safeParse(req.body);
   if (!success) {
       res.status(400).json({
         msg : "Invalid Inputs"
       })
   }
   const {username,password,email} = req.body;
   try {
      
      const salt =await  bcrypt.genSalt(10);
      const hashedpass = await bcrypt.hash(password,salt);
      const userResponse = await prisma.user.create({
         data : {
            username : username,
            password_hash : hashedpass,
            email : email
         }
      }
      )

      res.status(200).json({
         msg : "User created Successfully",
         response : userResponse
      })
   }catch(e){
      res.status(403).json({
         msg : "Error has happened",
         err : e
      })
   }
})

authRoutes.post("/login",async (req,res)=>{
  const {success} = LoginBody.safeParse(req.body);
  if (!success) {
   res.status(401).json({
      msg : "Invalid Inputs"
   })}
   const {email,password} = req.body;
})