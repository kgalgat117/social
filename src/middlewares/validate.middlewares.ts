import { Request, Response, NextFunction } from "express";
import { ErrorResponse, PayloadData } from './../properties/properties.interface'
import { UserModel } from "./../users/users.model";
import { IUserDocument } from "./../users/user.types";
import { getUserOTP, removeUserOTP } from "./../controllers/otp.controller"
import { validateAccessToken, getSession } from "./../controllers/token.controller"

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

export async function verifyUser(req: Request, res: Response, next: NextFunction) {
    var error: ErrorResponse = { message: 'Unauthorized Request', status: 401, flag: false, code: 4000 };
    try {
        conditions: {
            if (!req.headers.authorization) {
                error.flag = true
                error.code = 4006
                break conditions;
            }
            let token = req.headers.authorization.split(' ')[1]
            if (!token) {
                error.flag = true
                error.code = 4007
                break conditions;
            }
            let payload = validateAccessToken(token)
            if (!payload) {
                error.flag = true
                error.code = 4008
                break conditions;
            }
            if (!payload.sessionId) {
                error.flag = true
                error.code = 4011
                break conditions;
            }
            if (!payload.user) {
                error.flag = true
                error.code = 4012
                break conditions;
            }
            let session = await getSession(payload.sessionId)
            if (!session) {
                error.flag = true
                error.code = 4009
                break conditions;
            }
            if (session.status == 'inactive') {
                error.flag = true
                error.code = 4010
                break conditions;
            }
            if (session.tokenType != 'accessToken') {
                error.flag = true
                error.code = 4013
                break conditions;
            }
            let user: IUserDocument | null = await UserModel.findOne({ primaryEmail: payload.user }).exec();
            if (!user) {
                error.flag = true
                error.code = 4002
                break conditions;
            }
            res.locals.user = user
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