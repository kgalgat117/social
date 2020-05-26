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
    profileImage: String,
    profileCompletedPercentage: {
        type: Number,
        default: 0
    },
    profileStatus: {
        type: String,
        enum: ['active', 'inactive', 'deleted'],
        default: 'inactive'
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    updatedOn: {
        type: Date,
        default: new Date()
    }
});

export default UserSchema;