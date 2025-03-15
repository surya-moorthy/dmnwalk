import { prisma } from "@repo/db/client";
import { Router } from "express";
import { ChallengesBody } from "../../types/types";
import z from "zod";
export const challengesRoutes = Router();

challengesRoutes.get('/',(req,res)=>{
   try {
       const challengesResponse = await prisma.challenge.findMany({
          select : {
             title : true,
             description : true ,
             creator_id : true,
             category : true,
             start_date : true ,
             end_date : true
          }
       })
      res.status(200).json({
        challenges : challengesResponse 
      })
   }
   catch(e) {
    res.status(403).json({
        msg : "Error occured",
        err : e
    })
   }    
})

// challengesRoutes.post('/',async (req,res)=>{
//     const {success} = ChallengesBody.safeParse(req.body);
//     if (!success) {
//         res.status(401).json({ msg : "Invalid Inputs" })
//         return
//     }
//     try {
//         const {title,description,category,start_date,end_date} = req.body as z.infer<typeof ChallengesBody>;
//         const challengeCategory = await prisma.challengeCategory.findFirst({
//             where : { 
//                  name : category
//             }}
//         )
//         if (!challengeCategory){
//             res.status(401).json({ msg : "Invalid Category" })
//             return 
//         }
//         // await prisma.challenge.create({
//         //     data : {
//         //         title : title,
//         //         description : description,
//         //         category : {
//         //             connect : 
//         //         },
//         //         start_date : start_date,
//         //         end_date : end_date
//         //     }
//         // })
//         res.status(200).json({ msg : "Challenge Created Successfully"})
//     }
// })