const { EntitySchema, PrimaryColumn } = require("typeorm");

class Friend {
  constructor() {
  }
}

module.exports = new EntitySchema({
  name: "Friend",
  tableName: "friend",
  columns: {
    id: {
      primary: true,
      generated: "increment",
      type: "int",
    },
    userId: {
      type: "int",
    },
    friendId: {
      type: "int",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "userId",
        referencedColumnName: "id",
      },
      inverseSide: "friends",
    },
    friend: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "friendId",
        referencedColumnName: "id",
      },
      inverseSide: "friends",
    },
  },
});
