import { createConnection, Connection } from "mongoose";
import { CONSTANTS } from './../config/constants'

let DB: Connection;

export const connect = () => {

    const uri = `mongodb+srv://${CONSTANTS.DB_USERNAME}:${CONSTANTS.DB_PASSWORD}@${CONSTANTS.DB_CLUSTER}/${CONSTANTS.DB_DATABASE}?retryWrites=true&w=majority`;

    DB = createConnection(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    DB.once("open", async () => {
        console.log(`Connected to database - ${CONSTANTS.DB_DATABASE}`);
    });

    DB.on("error", () => {
        console.log("Error connecting to database");
    });

};

export { DB }