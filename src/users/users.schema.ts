import { Schema } from "mongoose";

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    bio: String,
    primaryEmail: String,
    primaryNumber: {
        type: {
            code: String,
            number: Number
        }
    },
    profileImage: String,
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