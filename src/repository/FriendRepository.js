const { dataSource } = require("../../dataSource");
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

    createFriend = async (senderId, receiverId) => {

        const friendRepository = dataSource.getRepository(FriendEntity);

        const newFriend1 = new FriendEntity();

        newFriend1.userId = senderId;
        newFriend1.friendId = receiverId;
    
        await friendRepository.save(newFriend1);

        const newFriend2 = new FriendEntity();

        newFriend2.userId = receiverId;
        newFriend2.friendId = senderId;
    
        await friendRepository.save(newFriend2);
    
        return true;
    } 

}

module.exports = FriendRepository;
