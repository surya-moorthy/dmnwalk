import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const jwtSecret = process.env.JWT_SECRET || "jwtsecret";

export const userMiddleware = (req : Request,res : Response,next: NextFunction) => {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];
    console.log(token);
    if(!token) { res.status(403).json({ msg : "Maybe token Invalid" }) ; return};
    try {
       const decode = jwt.verify(token,jwtSecret) as {email : string , userId : string};
       res.locals.userId = decode.userId;
       next();
    }catch(e){
        res.status(403).json({
            msg : "Unauthorized",
            err : e
        })
    }
}