const UserRepository = require("../repository/UserRepository");

class UserDTO {
    constructor(user, isFriend) {
        this.userId = user.userId;
        this.createDate = user.createDate;
        this.friendsCount = user.friendsCount;
        this.id = user.id;
        this.isFriend = isFriend;
    }
}

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
        this.err = new Error('UserService Error');
    }

    getUsers = async (loginUserId) => {

        const [loginUser, users] = await Promise.all([
            this.getUser(loginUserId),
            this.userRepository.getUsers(loginUserId)
        ]);

        const friendIds = loginUser.friends.map(friend => friend.friendId);

        const userDtoList = users.map(user => {
            const isFriend = friendIds.includes(user.id);
            return new UserDTO(user, isFriend);
        });

        return userDtoList;
    };

    getUser = async (loginUserId) => {

        const loginUser = await this.userRepository.getUser(loginUserId);

        return loginUser;
    };
};

module.exports = UserService;