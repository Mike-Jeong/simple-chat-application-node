const UserService = require("../service/UserService");

class UserController {

    constructor() {
        this.userService = new UserService();
    }

    getUsers = async (req, res) => {

        const loginUserId = 1;
        const result = await this.userService.getUsers(loginUserId);
        res.status(200).send(result);
    };
};

module.exports = UserController;