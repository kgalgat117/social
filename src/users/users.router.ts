import express, { Request, Response } from "express";
import { sendMail } from './../controllers/functions.controller'
import { generateOTP, storeUserOTP } from './../controllers/otp.controller'
import { SendMailParameters } from './../properties/properties.interface'
import { validateSendOTP, validateToken } from './../middlewares/validate.middlewares'

export const usersRouter = express.Router();

usersRouter.get("/token", validateToken, async (req: Request, res: Response) => {
    try {
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e);
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
        res.status(200).send(mailSent)
    } catch (e) {
        res.status(400).json(e)
    }
})