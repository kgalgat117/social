import { Document, Model } from "mongoose";
import { Phone } from '../properties/phone.interface'

export interface IUser {
    firstName: string;
    lastName: string;
    primaryNumber: Phone;
    primaryEmail: string;
    bio: string;
    profileImage: string;
    createdOn?: Date;
    updatedOn?: Date;
}

export interface IUserDocument extends IUser, Document {

}

export interface IUserModel extends Model<IUserDocument> {

}