import { prisma } from "@repo/db/client";
import { Router } from "express";
import { UpdateUserPreferencesSchema } from "../../types/types";
import z from "zod";

export const userRoutes = Router();

userRoutes.get("/:userId",async (req,res)=>{
    const userId = req.params.userId;
    try {
        const user = await prisma.user.findUnique({
            where : {
                id : Number(userId)
            }
        })
        res.status(200).json({
            user : user
        })
    }
    catch(e) {
        res.status(403).json({
            msg : "Error occured",
            err : e
        })
    }
})

userRoutes.put("/:userId/preferences",async (req,res)=>{
   const result = UpdateUserPreferencesSchema.safeParse(req.body);
     if(!result.success){
        res.status(400).json({  msg : "Invalid Data" }) ;
    return 
 }
    const data = result.data as z.infer<typeof UpdateUserPreferencesSchema>;
    try {
        const updatePreferences = await prisma.userPreferences.update({
            where : {
                userId : Number(req.params.userId)
            },
            data : data
        })
        res.status(200).json({ msg : "Preferences Updated" })
    }
    catch(e) {
        res.status(403).json({
            msg : "Error occured",
            err : e
        })
    }
})

userRoutes.get("/:userId/stats",async (req,res)=>{
  const userId = req.params.userId; 
  try {
    const userStats = await prisma.user.findFirst({
        where : {
            id : Number(userId)
        },
        include : {
            userstats : true
        }
    })
    res.status(200).json({
        userStats : userStats
    })
  } catch(e) {
    res.status(403).json({
        msg : "Error occured",
        err : e
    })
  }
})

userRoutes.get("/:userId/challenges",async (req,res)=>{
    const userId = req.params.userId; 
    try {
      const userChallenges = await prisma.user.findFirst({
          where : {
              id : Number(userId)
          },
          include : {
             createdChallenges : true,
             participatedChallenges : true    
          }
      })
      res.status(200).json({
        userChallenges : userChallenges
      })
    } catch(e) {
      res.status(403).json({
          msg : "Error occured",
          err : e
      })
    }
})

userRoutes.get("/:userId/achievements",async (req,res)=>{
    const userId = req.params.userId;
    try {
        const userAchievements = await prisma.user.findFirst({
            where : {
                id : Number(userId)
            },
            include : {
                userAchievements : true
            }
        })
        res.status(200).json({
            userAchievements : userAchievements
        })
    }
    catch(e) {
        res.status(403).json({
            msg : "Error occured",
            err : e
        })
    }
})

