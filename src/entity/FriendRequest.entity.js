const { EntitySchema } = require("typeorm");

class FriendRequest {
  constructor() {
  }
}

module.exports = new EntitySchema({
  name: "FriendRequest",
  tableName: "friend_request",
  columns: {
    id: {
      primary: true,
      generated: "increment",
      type: "int",
    },
    senderId: {
      type: "int",
    },
    receiverId: {
      type: "int",
    },
    status: {
      type: "enum",
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  relations: {
    sender: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "senderId",
        referencedColumnName: "id",
      },
    },
    receiver: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "receiverId",
        referencedColumnName: "id",
      },
    },
  },
});
