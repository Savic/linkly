import express from "express";
import bodyParser from "body-parser";

import {AppDataSource} from "./database/source";

import linkRouter from "./api/link.router";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Use the router
app.use("/api", linkRouter);

// Start the server
async function startServer() {
    try {

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    } catch (error) {
        console.log("Error initializing data source:", error);
    }
}

startServer().catch(e => console.error(e));
