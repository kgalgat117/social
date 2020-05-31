import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from './../properties/properties.interface'
import { UserModel } from "./../users/users.model";
import { IUserDocument } from "./../users/user.types";
import { getUserOTP, removeUserOTP } from "./../controllers/otp.controller"

export async function validateSendOTP(req: Request, res: Response, next: NextFunction) {
    var error: ErrorResponse = { message: 'Something Went Wrong', status: 400, flag: false, code: 4000 };
    try {
        conditions: {
            if (!req.body.emailAddress) {
                error.message = 'Email Missing';
                error.status = 400
                error.code = 4001
                error.flag = true
                break conditions;
            } else {
                let user: IUserDocument | null = await UserModel.findOne({ primaryEmail: req.body.emailAddress });
                if (!user) {
                    user = await UserModel.create({ primaryEmail: req.body.emailAddress });
                }
                res.locals.user = user
            }
        }
    } catch (catchError) {
        error.flag = true
    }
    if (error.flag) {
        res.status(error.status).json({ error: error.message, code: error.code })
    } else {
        next()
    }
}

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    var error: ErrorResponse = { message: 'Something Went Wrong', status: 400, flag: false, code: 4000 };
    try {
        conditions: {
            if (!req.body.emailAddress) {
                error.message = 'Email Missing';
                error.status = 400
                error.code = 4001
                error.flag = true
                break conditions;
            } else {
                let user: IUserDocument | null = await UserModel.findOne({ primaryEmail: req.body.emailAddress });
                if (!user) {
                    error.message = 'User Not Found';
                    error.status = 404
                    error.code = 4002
                    error.flag = true
                    break conditions;
                }
                res.locals.user = user
            }
            if (!req.body.otp) {
                error.message = 'otp Missing';
                error.status = 400
                error.code = 4003
                error.flag = true
                break conditions;
            } else {
                let otpObject = getUserOTP(req.body.emailAddress)
                if (!otpObject) {
                    error.message = 'otp not initialized';
                    error.status = 401
                    error.code = 4004
                    error.flag = true
                    break conditions;
                } else {
                    if (otpObject.otp != req.body.otp) {
                        error.message = 'otp mismatched';
                        error.status = 401
                        error.code = 4005
                        error.flag = true
                        break conditions;
                    } else {
                        removeUserOTP(req.body.emailAddress)
                    }
                }
            }
        }
    } catch (catchError) {
        error.flag = true
    }
    if (error.flag) {
        res.status(error.status).json({ error: error.message, code: error.code })
    } else {
        next()
    }
}