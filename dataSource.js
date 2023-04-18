const { DataSource } = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();

const dataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    logging: true,
    synchronize: true,
    entities: [
        require("./src/entity/Friend.entity"),
        require("./src/entity/User.entity"),
        require("./src/entity/FriendRequest")
    ]
});

module.exports = { dataSource };