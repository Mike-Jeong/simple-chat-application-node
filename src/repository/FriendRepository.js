const { dataSource } = require("../../dataSource");
const { Not, Equal } = require("typeorm");
const FriendEntity = require("../entity/Friend.entity");

class FriendRepository {

    getFriends = async (loginUserId) => {

        const friendRepository = dataSource.getRepository(FriendEntity);

        const friends = await friendRepository.find({
            relations: ["friend"],
            where: { userId: loginUserId },
        });

        return friends.map(friend => friend.friend); 

    }

    /*addFriend = async (loginUserId) => {

        const friendRepository = dataSource.getRepository(FriendEntity);

        return 1;
    }*/

    deleteFriend = async (loginUserId, targetUserId) => {

        const friendRepository = dataSource.getRepository(FriendEntity);

        const friendsToRemove = await friendRepository.find({
            where: [
                { userId: loginUserId, friendId: targetUserId },
                { userId: targetUserId, friendId: loginUserId },
            ],
        });
    
        if (friendsToRemove.length === 0) {
            throw new Error("Cannot find friends to remove.");
        }
    
        await friendRepository.remove(friendsToRemove);
    
        return true;
    }

}

module.exports = FriendRepository;
