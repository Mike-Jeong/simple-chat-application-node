const UserRepository = require("../repository/UserRepository");

class UserDTO {
    constructor(user) {
        this.userId = user.userId;
        this.createDate = user.createDate;
        this.friendsCount = user.friendsCount;
        this.id = user.id;
    }
}

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
        this.err = new Error('UserService Error');
    }

    getUsers = async(loginUserId)=> {

        const users = await this.userRepository.getUsers(loginUserId);
        
        const userDtoList = users.map(user => {
            return new UserDTO(user);
        });

        return userDtoList;
    };
};

module.exports = UserService;