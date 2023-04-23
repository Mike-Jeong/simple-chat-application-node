const AuthService = require("../service/AuthService");

class AuthController {
    authService = new AuthService();

    login = async (req, res) => {
        const { loginId, password } = req.body;
        const data = await this.authService.login(loginId, password);
        res.status(200).send(data);
    };
};

module.exports = AuthController;
