const UserService = require("../service/UserService");


class CreateUserRequest {
    constructor(req) {
        this.userId = req.body.userId;
        this.password = req.body.password;
        this.name = req.body.name;
    }
}


class UserController {

    constructor() {
        this.userService = new UserService();
    }

    getUsers = async (req, res) => {

        const loginUserId = 1;
        const result = await this.userService.getUsers(loginUserId);
        res.status(200).send(result);
    };

    createUser = async (req, res) => {

        const createUserDto = new CreateUserRequest(req);
        const result = await this.userService.createUser(createUserDto);
        res.status(200).send(result);
    };
};

module.exports = UserController;