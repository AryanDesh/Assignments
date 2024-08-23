import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import {Request, Response, NextFunction} from 'express';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

const AdminMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const token = req.headers.authorization;
    if(!token){
        res.status(403).json({
            message : "token not found"
        })
    }
    else{
        const words = token?.split(" ");
        if(words[0] !== 'Bearer' || words.length !== 2){
            res.status(403).json({
                message : "invalid authorization"
            })
        }
        const jwtToken = words[1];
        try{
            const check = jwt.verify(jwtToken, JWT_SECRET);
            next();
        }
        catch(e) {
            res.status(404).json({
                message : " Admin not valid"
            })
        }
    }

}

export {
    AdminMiddleware
}
