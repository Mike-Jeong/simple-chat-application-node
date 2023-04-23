const express = require('express');
const socket = require('./socket');
const http = require('http');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Router = require("./src/route");
const errorHandler = require("./src/middleware/errorHandler");
const { dataSource } = require('./dataSource');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        allowedHeaders: ["content-Type", "Authorization"],
        exposedHeaders: ["content-Type", "Authorization"],
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"],
        credential: "true",
    })
);

app.options("*", cors());
app.use("/", Router);
app.use(errorHandler);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/login", (req, res) => {
    res.render("login");
}); 


const server = http.createServer(app);
socket(server);

dataSource
    .initialize()
    .then(() => {
        console.log("Database connection has been established!");
        server.listen(8000, function () {
            console.log('Server is running...');
        });
    })
    .catch(error => {
        console.error("Unable to connect to the database:", error);
    });