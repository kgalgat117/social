import express, { Request, Response } from "express";
import { UserModel } from "./users.model";
import { IUserDocument } from "./user.types";
import { Users } from "./users.types";
import { sendMail, generateOTP } from './../controllers/functions.controller'
import { SendMailParameters } from './../properties/properties.interface'
import { validateSendOTP } from './../middlewares/validate.middlewares'

export const usersRouter = express.Router();

usersRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users: Users = await UserModel.find();
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send(e);
    }
});

usersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const user: IUserDocument = req.body;
        let newUser = await UserModel.create(user);
        res.status(200).json(newUser)
    } catch (e) {
        res.status(400).send(e);
    }
});

usersRouter.post("/otp", validateSendOTP, async (req: Request, res: Response) => {
    try {
        var otp = generateOTP()
        var sendMailParameters: SendMailParameters = {
            to: req.body.emailAddress,
            subject: 'Account Verification OTP',
            text: `Your OTP to verify your account is ${otp}. Do not share this with anyone.`
        }
        let sentMail = await sendMail(sendMailParameters)
        res.status(200).send(sentMail)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
})