import express, { Request, Response } from "express";
import { UserModel } from "./users.model";
import { IUserDocument } from "./user.types";
import { Users } from "./users.types";

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
        console.log(e)
        res.status(400).send(e);
    }
});