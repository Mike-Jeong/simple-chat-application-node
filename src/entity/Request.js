var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Request",
  tableName: "request",
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
