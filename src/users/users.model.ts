import { DB } from './../database/database'
import { IUserDocument } from "./user.types";
import UserSchema from "./users.schema";

export const UserModel = DB.model<IUserDocument>("users", UserSchema);