import { createConnection } from "mongoose";
import { CONSTANTS } from './../config/constants'

export const connect = () => {

    const uri = `mongodb+srv://${CONSTANTS.DB_USERNAME}:${CONSTANTS.DB_PASSWORD}@${CONSTANTS.DB_CLUSTER}/${CONSTANTS.DB_DATABASE}?retryWrites=true&w=majority`;

    var DB = createConnection(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    DB.once("open", async () => {
        console.log("Connected to database");
    });

    DB.on("error", () => {
        console.log("Error connecting to database");
    });
};