import jwt  from 'jsonwebtoken'
import {Request,Response,NextFunction} from 'express'
import path from 'path'
import dotenv from 'dotenv'
import {  Payload } from '../Models/authModels'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


export interface ExtendedRequest1 extends Request{
    info?:Payload
}
export function verifyToken(req:ExtendedRequest1,res:Response, next:NextFunction){

    try {
        //reading token 
        const token = req.headers['token'] as string

        // is there a token?
        if(!token){
            return res.status(401).json({message:'Forbidden!!'})
        }
        //read
        //verify
        const decodedData= jwt.verify(token,process.env.SECRET as string) as Payload
        req.info=decodedData

    } catch (error) {
        return res.status(500).json(error)
    }

    ///above-----( Request is Paused!!)
    next()

}