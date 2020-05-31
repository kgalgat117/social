import { Schema } from "mongoose";

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    bio: { type: String },
    primaryEmail: { type: String, unique: true, required: true },
    primaryNumber: {
        type: {
            code: String,
            number: Number
        },
        unique: true
    },
    dateOfBirth: {
        type: String
    },
    gender: {
        type: String
    },
    sexualOrientation: {
        type: String
    },
    showMe: {
        type: String,
        enum: ['Men', 'Women', 'Everyone']
    },
    profileImage: String,
    profileCompletedPercentage: {
        type: Number,
        default: 0
    },
    profileStatus: {
        type: String,
        enum: ['active', 'inactive', 'deleted'],
        default: 'inactive'
    }
}, { timestamps: true });

export default UserSchema;