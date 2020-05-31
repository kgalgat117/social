import { DB } from './../database/database'
import { ISessionDocument } from "./session.types";
import SessionSchema from "./sessions.schema";

export const SessionModel = DB.model<ISessionDocument>("sessions", SessionSchema);