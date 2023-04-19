const FriendRequestRepository = require("../repository/FriendRequestRepository");
const FriendRepository = require("../repository/FriendRepository");

class FriendRequestDTO {
    constructor(friendRequestUsers) {
        this.senderId = friendRequestUsers.sender.userId;
        this.createDate = friendRequestUsers.sender.createDate;
        this.senderName = friendRequestUsers.sender.name;
        this.requestId = friendRequestUsers.id;
    }
}

class FriendRequestService {

    constructor() {
        this.friendRequestRepository = new FriendRequestRepository();
        this.friendRepository = new FriendRepository();
        this.err = new Error('FriendRequestService Error');
    }

    getFriendRequests = async (loginUserId) => {

        const friendRequestUsers = await this.friendRequestRepository.getFriendRequestUsers(loginUserId);

        const friendRequestUserDtoList = friendRequestUsers.map(friendRequestUser => {
            return new FriendRequestDTO(friendRequestUser);
        });

        return friendRequestUserDtoList;
    };

    createFriendRequest = async (loginUserId, targetUserId) => {

        const result = await this.userRepository.createFriendRequest(loginUserId, targetUserId);

        return result;
    };

    processFriendRequest = async (friendRequestId, process) => {

        const friendRequest = await this.friendRequestRepository.findFriendRequest(friendRequestId);

        if (process) {
            await this.friendRepository.createFriend(friendRequest.senderId, friendRequest.receiverId);
        }

        await this.friendRequestRepository.deleteFriendRequest(friendRequest);

        return true;
    };
};

module.exports = FriendRequestService;