import { Schema, Mongoose } from "mongoose";

const SessionSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    tokenType: {
        type: String,
        enum: ['accessToken', 'refreshToken'],
        required: true
    }
}, { timestamps: true });

export default SessionSchema;