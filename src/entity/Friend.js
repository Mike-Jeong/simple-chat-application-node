var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Friend",
  tableName: "friend",
  columns: {
    id: {
      primary: true,
      generated: "increment",
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
    },
    friend: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "friendId",
        referencedColumnName: "id",
      },
    },
  },
});