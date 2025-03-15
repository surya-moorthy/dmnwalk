import { prisma } from "@repo/db/client";
import { Router } from "express";

import z from "zod";
import { ChallengeSchema, ChallengeUpdateSchema } from "../../types/types";
import { userMiddleware } from "../../middleware/userMiddleware";
export const challengesRoutes = Router();

challengesRoutes.get('/',async (req,res)=>{
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

challengesRoutes.post('/',async (req,res)=>{
    const result = ChallengeSchema.safeParse(req.body);
    if (!result.success) {
        res.status(401).json({ msg : "Invalid Inputs" })
        return
    }
    try {
        const  data = result.data as z.infer<typeof ChallengeSchema>;
        const challengeCategory = await prisma.challengeCategory.findFirst({
            where : { 
                OR : [
                    { id : data.category.id },
                    { name : data.category.name }
                ]
            }}
        )

        if (!challengeCategory){
            res.status(401).json({ msg : "Invalid Category" })
            return 
        }
        await prisma.challenge.create({
            data : {
                title : data.title,
                description : data.description,
                category : {
                    connect : {
                        id : challengeCategory.id,
                        name : challengeCategory.name
                    }
                },
                duration_days : data.duration_days,
                stake_amount : data.stake_amount,
                goal_type : data.goal_type,
                goal_value : data.goal_value,
                start_date : data.start_date,
                end_date : data.end_date,
            }
        })
        res.status(200).json({ msg : "Challenge Created Successfully"})
    }
    catch(e) {
        res.status(403).json({
            msg : "Error occured",
            err : e
        })
    }
})

challengesRoutes.get('/:challengesId',async (req,res)=>{
    const challengeId = req.params.challengesId;
    try {
       const challenge = await prisma.challenge.findUnique({
          where : {
            id : Number(challengeId)
          },
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
         challenge : challenge
       })
    }
    catch(e) {
     res.status(403).json({
         msg : "Error occured",
         err : e
     })
    }    
 })

challengesRoutes.put("/:challengeId", async (req, res) => {
      const challengeId = req.params.challengeId;
      const updateData = ChallengeUpdateSchema.safeParse(req.body);
      try {
        const challenge = await prisma.challenge.findUnique({
            where : {
                id : Number(challengeId)
            }
        })
        if (!challenge) {
            res.status(401).json({
                msg : "Invalid Id or the challenge is not been created"
            })
            return
        }
        const data = updateData.data as z.infer<typeof ChallengeUpdateSchema>;
        const updatedChallenge = await prisma.challenge.update({
            where : {id : Number(challengeId)},
            data : data
      })
        res.status(200).json({
            challenge : updatedChallenge
        })
}  catch(e) {
   res.status(403).json({
    msg : "Error Occured",
    err : e
})
}})


challengesRoutes.delete("/:challengeId", async (req, res) => {
    const challengeId = req.params.challengeId;
    try {
        const challenge = await prisma.challenge.findUnique({
            where : {
                id : Number(challengeId)
            }
        })
        if (!challenge) {
            res.status(401).json({
                msg : "Invalid Id or the challenge is not been created"
            })
            return
        }
        await prisma.challenge.delete({
            where : {id : Number(challengeId)}
        })
        res.status(200).json({
            msg : "Challenge Deleted Successfully"
        })
    } catch(e) {
        res.status(403).json({
            msg : "Error Occured",
            err : e
        })
    }
})

challengesRoutes.get("/challenges/categories", async (req, res) => {
    try {
        const categories = await prisma.challengeCategory.findMany({
            // Optionally include the count of challenges in each category
            include: {
              _count: {
                select: {
                  challenges: true
                }
              }
            }
          });
        res.status(200).json({  
            categories : categories
        })
    }
    catch(e) {
        res.status(403).json({
            msg : "Error Occured",
            err : e
        })
    }
})

challengesRoutes.get("/:challengeId/join", userMiddleware ,async (req, res) => {
     const challengeId = req.params.challengeId;
     const userId = res.locals.userId;
     try {
        const verifiedChallenge = await prisma.challenge.findUnique({
            where : {
                id : Number(challengeId)
            }
        })
        if (!verifiedChallenge) {
            res.status(401).json({
                msg : "Invalid Challenge Id"
            })
            return
        }
        const user = await prisma.user.findUnique({
            where : {
                id : Number(userId)
            }
        }) 
        if (!user) {
            res.status(401).json({
                msg : "Invalid User Id"
            })
            return
        }
        const challengeparticipate = await prisma.challengeParticipant.create({
            data : {
                challenge : {
                    connect : {
                        id : verifiedChallenge.id,
                    }
                },
                user : {
                    connect : {
                        id : user.id
                    }
                }
            }
        })
        
        res.status(200).json({ 
            msg : "User Joined the Challenge"
        })
     }
     catch(error) {
        console.error("Error joining challenge:", error);
        res.status(500).json({ msg: "Internal server error" });

    }
})

challengesRoutes.get("/:challengeId/participants",async (req, res) => {
  const challengeId = req.params.challengeId;
  try {
    const challenge = await prisma.challenge.findUnique({
        where : {
            id : Number(challengeId)
        },
        select : {
            participants : true
        }
    })
  }
  catch(error) {
    console.error("Error joining challenge:", error);
    res.status(500).json({ msg: "Internal server error" });

}
})

challengesRoutes.get("/trending",async (req, res) => {

})
