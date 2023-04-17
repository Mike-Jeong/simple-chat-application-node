var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "User",
  tableName: "user",
  columns: {
    id: {
      primary: true,
      generated: "increment",
      type: "int",
    },
    userId: {
        unique: true,
        type: "varchar",
    },
    password: {
        type: "varchar",
    },
    name: {
        type: "varchar",
    },
    // 추가적인 필드들을 정의할 수 있습니다.
  },
  relations: {
    friends: {
      type: "many-to-many",
      target: "Friend",
      joinTable: {
        name: "user_friend",
        joinColumn: {
          name: "userId",
          referencedColumnName: "id",
        },
        inverseJoinColumn: {
          name: "friendId",
          referencedColumnName: "id",
        },
      },
    },
  },
});

