const UserService = require("../service/UserService");

class FriendService {

    constructor() {
        this.userService = new UserService();
        this.err = new Error('FriendService Error');
    }

    getFriends = async (loginUserId) => {

        const [friends, users] = await Promise.all([
            this.getFriendUsers(loginUserId),
            this.userRepository.getUsers(loginUserId)
        ]);

        const friendIds = friends.map(friend => friend.id);

        const userDtoList = users.map(user => {
            const isFriend = friendIds.includes(user.id);
            return new UserDTO(user, isFriend);
        });

        return userDtoList;
    };

    deleteFriend = async (loginUserId) => {

        const friends = await this.userRepository.getFriends(loginUserId);

        const friendDtoList = friends.map(friend => {
            const isFriend = true;
            return new UserDTO(user, isFriend);
        });

        return friendDtoList;
    };
};

module.exports = FriendService;