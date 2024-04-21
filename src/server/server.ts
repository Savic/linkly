import express from "express";
import bodyParser from "body-parser";
import path from "path";

import linkRouter from "./api/link.router";
import {AppDataSource} from "./database/source";

const server = express();
const port = process.env.PORT || 3000;


server.use(express.static("public", {
    setHeaders: (res) => {
        // TODO: Set prod env things
        // res.setHeader("Cache-Control", "public, max-age=31557600")
    }
}));

// Middleware
server.use(bodyParser.json());

// Use the router
server.use("/api", linkRouter);

server.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Start the server
async function startServer() {
    try {
        /* Open the database connection */
        await AppDataSource.getConnection().initialize();

        /* Listen to the port */
        server.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    } catch (error) {
        console.log("Error initializing data source:", error);
    }
}

startServer().catch(e => console.error(e));
