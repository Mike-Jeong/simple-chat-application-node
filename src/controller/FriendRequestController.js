const FriendRequestService = require("../service/FriendRequestService");

class FriendRequestController {

    constructor() {
        this.friendRequestService = new FriendRequestService();
    }

    getFriendRequests = async (req, res) => {

        const loginUserId = 1;
        const result = await this.friendRequestService.getFriendRequests(loginUserId);
        res.status(200).send(result);
    };

    createFriendRequest = async (req, res) => {

        const loginUserId = 1;
        const targetUserId = 4;
        const result = await this.friendRequestService.createFriendRequest(loginUserId, targetUserId);
        res.status(200).send(result);
    };

    processFriendRequest = async (req, res) => {

        const friendRequestId = 1;
        const accept = true;
        const result = await this.friendRequestService.processFriendRequest(friendRequestId, process);
        res.status(200).send(result);
    };
};

module.exports = FriendRequestController;