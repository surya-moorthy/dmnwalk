import { Prisma, prisma } from "@repo/db/client";
import { Router } from "express";

import z from "zod";
import { ChallengeUpdateSchema, CreateChallengeSchema } from "../../types/types";
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
    const result = CreateChallengeSchema.safeParse(req.body);
    if (!result.success) {
        res.status(401).json({ msg : "Invalid Inputs" })
        return
    }
    try {
        const  data = result.data as z.infer<typeof CreateChallengeSchema>;
        await prisma.challenge.create({
            data : data
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

challengesRoutes.get('/:challengeId',async (req,res)=>{
    const challengeId = req.params.challengeId;
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
        const challenge = await prisma.challenge.findUnique({
            where : {
                id : Number(challengeId)
            }
        })
        if (!challenge) {
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
        const requiresStake = Number(challenge.stake_amount) > 0;
        const challengeparticipate = await prisma.challengeParticipant.create({
               data : {
                challenge_id: challenge.id,
                user_id: Number(userId),
                status: "registered", // Default value
                stake_amount: challenge.stake_amount, // Get from challenge
                stake_transaction_id: challenge.smart_contract_address, // Handle stake conditionally
                stake_status:  requiresStake ? "pending" : "corequnfirmed", // Change based on challenge
                current_progress: new Prisma.Decimal(0), // Default value
                current_streak: 0, // Default value
                longest_streak: 0, // Default value
                total_points: 0, // Default value
                joined_at: new Date(), // Default value
                completed_at: challenge.end_date ?? null, // Use challenge's end_date
                last_activity_at: new Date(), // Can be set to null if not needed

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

challengesRoutes.get("/:challengeId/leave",async (req, res) => {
    const challengeId = req.params.challengeId;
    const userId = res.locals.userId;
    try {
        const challenge = await prisma.challenge.findUnique({
            where : {
                id : Number(challengeId)
            }
        })
        if (!challenge) {
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
        await prisma.challengeParticipant.deleteMany({
            where : {
                challenge_id : Number(challengeId),
                user_id : Number(userId)
            }
        })
        res.status(200).json({ 
            msg : "User Left the Challenge"
        })
    }
    catch(error) {
        console.error("Error leaving challenge:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
})
challengesRoutes.get("/trending",async (req, res) => {
   
})
challengesRoutes.get("/:challengeId/stake",async (req, res) => {
    const challengeId = req.params.challengeId;
    try {
        const challengeStake = await prisma.challenge.findFirst({
            where : {
               id : Number(challengeId)
            },
            select : {
                stake_amount : true
            }
        })
    }
    catch(e) {
        console.log("error",e); 
        res.status(403).json({  
              msg : "An Error Occured while getting challenge stake",
        })
    }
})
challengesRoutes.get("/:challengeId/pool",async (req, res) => {
    const challengeId = req.params.challengeId;
    try {
        const challengePool = await prisma.challenge.findFirst({
            where : {
                id : Number(challengeId)
            }, 
            select : {
                total_pool : true
            }
        })
        res.status(200).json({
            challengeReward : challengePool
        })
    }
    catch(e) {
        console.log("error",e); 
        res.status(403).json({  
              msg : "An Error Occured while getting challenge pool ",
        })
    }
})
challengesRoutes.get("/:challengeId/rewards",async (req, res) => {
    const challengeId = req.params.challengeId;
    try {
        const challengeRewards = await prisma.challengeReward.findFirst({
            where : {
                challenge_id : Number(challengeId)
            }
        })
        res.status(200).json({
            challengeReward : challengeRewards
        })
    }
    catch(e) {
        console.log("error",e); 
        res.status(403).json({  
              msg : "An Error Occured while getting challenge rewards",
        })
    }
})
challengesRoutes.get("/:challengeId/progress",async (req, res) => {
     const challengeId = req.params.challengeId;
     try {
        const challengeProgress = await prisma.challenge.findFirst({
            where : {
                id : Number(challengeId)
            }, 
            select : {
                dailyProgress : true
            }
        })
        res.status(200).json({
            challengeProgress : challengeProgress
        })
     }
     catch(e) {
        console.log("error",e); 
        res.status(403).json({  
              msg : "An Error Occured while getting challenge daily progress",
        })
    }   
})
challengesRoutes.get("/:challengeId/statistics",async (req, res) => {

})
