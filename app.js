const express = require('express');
const socket = require('socket.io');
const http = require('http');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Router = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv");
dotenv.config();
const { DataSource } = require('typeorm');

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


const server = http.createServer(app);
const io = socket(server);

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: true,
    entities: [
        require("./src/entity/Friend").default,
        require("./src/entity/User").default,
        require("./src/entity/FriendRequest").default
    ]
});

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    });

app.get('/', function (request, response) {
    console.log('test api for express server');
    response.send('서버 테스트 api 호출에 성공하셨습니다.');
})


server.listen(8000, function () {
    console.log('서버 실행 중...');
})