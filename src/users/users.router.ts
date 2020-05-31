import express, { Request, Response } from "express";
import { sendMail } from './../controllers/functions.controller'
import { generateOTP, storeUserOTP } from './../controllers/otp.controller'
import { SendMailParameters } from './../properties/properties.interface'
import { validateSendOTP, validateToken } from './../middlewares/validate.middlewares'
import { createSession, createAccessToken } from './../controllers/token.controller'
import { CONSTANTS } from './../config/constants'

export const usersRouter = express.Router();

usersRouter.post("/token", validateToken, async (req: Request, res: Response) => {
    try {
        let session = await createSession(res.locals.user.emailAddress, 'accessToken')
        let payload = { sessionId: session._id, user: res.locals.user.emailAddress }
        let access_token = createAccessToken(payload)
        res.status(200).json({ access_token: access_token, expired_in: CONSTANTS.JWT_ACCESS_TOKEN_EXPIRE, type: 'bearer', user: res.locals.user });
    } catch (e) {
        res.status(400).json(e);
    }
});

usersRouter.post("/otp", validateSendOTP, async (req: Request, res: Response) => {
    try {
        var otp = generateOTP()
        storeUserOTP(res.locals.user, otp)
        var sendMailParameters: SendMailParameters = {
            to: req.body.emailAddress,
            subject: 'Account Verification OTP',
            text: `Your OTP to verify your account is ${otp}. Do not share this with anyone.`
        }
        let mailSent = await sendMail(sendMailParameters)
        if (mailSent) {
            res.status(202).send()
        } else {
            res.status(400).json({ error: "mail sent error" })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
})