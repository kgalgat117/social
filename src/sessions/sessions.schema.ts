import { Schema, Mongoose } from "mongoose";

const SessionSchema = new Schema({
    user: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    tokenType: {
        type: String,
        enum: ['accessToken', 'refreshToken'],
        default: 'active'
    }
}, { timestamps: true });

export default SessionSchema;