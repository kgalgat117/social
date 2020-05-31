import { Document, Model } from "mongoose";
import { Phone } from '../properties/properties.interface'

export interface IUser {
    firstName: string;
    lastName: string;
    primaryNumber: Phone;
    primaryEmail: string;
    bio: string;
    profileImage: string;
    dateOfBirth: string;
    gender: string;
    showMe: String;
    sexualOrientation: String;
    profileCompletedPercentage: number;
    profileStatus: string;
}

export interface IUserDocument extends IUser, Document {

}

export interface IUserModel extends Model<IUserDocument> {

}