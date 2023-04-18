const FriendRepository = require("../repository/FriendRepository");

class FriendDTO {
    constructor(friend) {
        this.friendId = friend.userId;
        this.createDate = friend.createDate;
        this.friendsCount = friend.friendsCount;
        this.id = friend.id;
    }
}

class FriendService {

    constructor() {
        this.friendRepository = new FriendRepository();
        this.err = new Error('FriendService Error');
    }

    getFriends = async (loginUserId) => {

        const friends = await this.friendRepository.getFriends(loginUserId)

        const friendDtoList = friends.map(friend => {
            return new FriendDTO(friend);
        });

        return friendDtoList;
    };

    deleteFriend = async (loginUserId, targetUserId) => {

        const result = await this.friendRepository.deleteFriend(loginUserId, targetUserId);

        return result;
    };
};

module.exports = FriendService;