import { Router } from "express";
import { DepositSchema } from "../../types/types";
import z from "zod";
import { prisma } from "@repo/db/client";
import { userMiddleware } from "../../middleware/userMiddleware";

export const transactionRoutes = Router();

transactionRoutes.post('/deposit',userMiddleware,async (req,res)=>{
   const result = DepositSchema.safeParse(req.body);
   const userId = res.locals.userId;
    if(!result.success){
        res.status(403).json({
            msg : "deposit Unsuccessful , Invalid data"
        })
        return 
    }
    try {
        const data = result.data as z.infer<typeof DepositSchema>;
        const userwallet = await prisma.userWallet.findFirst({ where : { user_id : userId } });
        const balance_before = Number(userwallet?.balance);
        const balance_after = Number(balance_before) + data.amount;
        await prisma.transaction.create({
           data : {
                user_id : userId,
                payment_method_id : data.payment_method_id,
                amount : data.amount,
                transaction_type : data.transaction_type,
                currency : data.currency,
                status : data.status,
                description : data.description,
                balance_before : balance_before,
                balance_after : balance_after
           }
        })
        await prisma.userWallet.update({
            where : { id: userwallet?.id },
            data : {
                balance : balance_after
            }
        })
        res.status(200).json({
            msg : "deposit Successful"
        })
    }     
  catch(err){
        console.log(`error + ${err}`);
        res.status(403).json({
            msg : "deposit Unsuccessful , Invalid data"
        })
    }
})
transactionRoutes.post('/withdraw',userMiddleware,async (req,res)=>{
    const userId = res.locals.userId;
    const result = DepositSchema.safeParse(req.body);
    if(!result.success){    
            res.status(401).json({
                msg : "Invalid inputs"
            })
            return
        }
   try {
    const data = result.data as z.infer<typeof DepositSchema>;
    const userwallet = await prisma.userWallet.findFirst({ where : { user_id : userId } });
    if(Number(userwallet?.balance) < data.amount){
        res.status(401).json({
            msg : "Balance is to low to withdraw"
        })
        return
    }
    const balance_before = Number(userwallet?.balance);
    const balance_after = Number(balance_before) - data.amount;
    await prisma.userWallet.update({
        where : { id: userwallet?.id },
        data : {
            balance : balance_after
        }
    })
    res.status(200).json({
        msg : "withdrawal Successful"
    })
   }
   catch(err){
    console.log(`error + ${err}`);
    res.status(403).json({
        msg : "Withdraw Unsuccessful "
    })
}
})
transactionRoutes.get('/history',userMiddleware,async (req,res)=>{
    const userId = res.locals.userId;
    try {
        const transactions = await prisma.transaction.findMany({ where : { user_id : userId } });
        res.json({
            msg : "transaction history",
            history : transactions
        })
    }
    catch(err){
        console.log(`error + ${err}`);
        res.status(403).json({
            msg : "transaction history Unsuccessful "
        })
    }
    
})
transactionRoutes.get('/:transactionId',async (req,res)=>{
    const transactionId = req.params.transactionId;
    try {
        const transaction = await prisma.transaction.findFirst({ where : { id : Number(transactionId) } });
        res.json({
            msg : "get transaction by id",
            transaction : transaction
        })
    }
    catch(err){
        console.log(`error + ${err}`);
        res.status(403).json({
            msg : "transaction history Unsuccessful "
        })
    }
})