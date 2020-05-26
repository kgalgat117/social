import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from './../properties/properties.interface'


export function validateSendOTP(req: Request, res: Response, next: NextFunction) {
    var error: ErrorResponse = { message: 'Something Went Wrong', status: 400, flag: false };
    if (!req.body.emailAddress) {
        error.message = 'Email Missing';
        error.status = 400
        error.flag = true
    }
    if (error.flag) {
        res.status(error.status).json({ error: error.message })
    } else {
        next()
    }
}