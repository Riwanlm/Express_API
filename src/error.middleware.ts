import { NextFunction, Request, Response } from "express";

export const errorHandler = (err:any, req:Request, res:Response, next:NextFunction)=> {
    console.log("Error Handler");
    console.error(err.stack);
    return res.status(500).send("Unexpected Error");
}