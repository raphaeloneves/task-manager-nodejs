const mongoose = require("mongoose");

const DB_HOST = process.env.DB_HOSTNAME || "127.0.0.1:27017";
const DB_NAME = process.env.DB_NAME || "task-manager-api";

mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(_ => console.log("Database connected."));

