import { Document, Model } from "mongoose";

export interface ISession {
    user: string;
    status: string;
    tokenType: string;
}

export interface ISessionDocument extends ISession, Document {

}

export interface ISessionModel extends Model<ISessionDocument> {

}