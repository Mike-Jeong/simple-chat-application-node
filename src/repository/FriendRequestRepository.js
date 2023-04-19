const { dataSource } = require("../../dataSource");
const FriendRequestEntity = require("../entity/FriendRequest.entity");

class FriendRequestRepository {

    getFriendRequestUsers = async (loginUserId) => {

        const friendRequestRepository = dataSource.getRepository(FriendRequestEntity);

        const senders = await friendRequestRepository.find({
            relations: ["sender"],
            where: { receiverId: loginUserId },
        });

        return senders;

    }

    createFriendRequest = async (loginUserId, targetUserId) => {

        const friendRequestRepository = dataSource.getRepository(FriendRequestEntity);

        const friendRequest = await friendRequestRepository.find({
            where: [
                { senderId: loginUserId, receiverId: targetUserId },
                { senderId: targetUserId, receiverId: loginUserId },
            ],
        });

        if (friendsToRemove.length != 0) {
            throw new Error("Already have a friend request between them");
        }

        const newFriendRequest = new FriendRequestEntity();

        newFriendRequest.senderId = loginUserId;
        newFriendRequest.receiverId = targetUserId;

        await friendRequestRepository.save(newFriendRequest);

        return true;

    }

    findFriendRequest = async (friendRequestId) => {

        const friendRequestRepository = dataSource.getRepository(FriendRequestEntity);

        const friendRequest = await friendRequestRepository.findOne({where: { id: friendRequestId }});

        return friendRequest;
    }

    deleteFriend = async (friendRequest) => {

        const friendRequestRepository = dataSource.getRepository(FriendRequestEntity);

        await friendRepository.remove(friendRequest);

        return true;
    }

}

module.exports = FriendRequestRepository;