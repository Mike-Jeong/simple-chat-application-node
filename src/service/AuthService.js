const UserRepository = require("../repository/UserRepository");
const jwt = require("jsonwebtoken");

class AuthService {
    userRepository = new UserRepository();
    err = new Error('AuthService Error');

    login = async (loginId, password) => {
        if (!loginId || !password) {
            this.err.status = 400;
            this.err.message = '아이디 및 비밀번호를 입력해주세요.';
            throw this.err;
        };
        const user = await this.usersRepository.getUser(loginId);
        
        if (!user) {
            this.err.status = 400;
            this.err.message = '아이디 또는 패스워드를 확인해주세요';
            throw this.err;
        };

        if (user.password != password) {
            this.err.status = 400;
            this.err.message = '아이디 또는 패스워드를 확인해주세요';
            throw this.err;
        };

        const accessToken = jwt.sign({ loginId: user.loginId }, process.env.SECRET_KEY,
            {
                expiresIn: '1d'
            });
        return { loginId: user.userId, accessToken: `Bearer ${accessToken}` };
    };
};

module.exports = AuthService;