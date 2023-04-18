const FriendService = require("../service/FriendService");

class FriendController {
    constructor() {
        this.friendService = new FriendService();
    }

    getFriends = async (req, res) => {

        const loginUserId = 1;
        const result = await this.friendService.getFriends(loginUserId);
        res.status(200).send(result);
    };

    deleteFriend = async (req, res) => {

        const loginUserId = 1;
        const targetUserId = 2;

        const result = await this.friendService.deleteFriend(loginUserId, targetUserId);
        
        res.status(200).send(result);
    };

}

module.exports = FriendController;