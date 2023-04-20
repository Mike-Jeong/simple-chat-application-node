const { EntitySchema } = require("typeorm");

class User {
  constructor() {
    this.createDate = new Date();
  }
}

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

    createDate: {
      type: "datetime",
      transformer: {
        from: (value) => value,
        to: (value) => value.toISOString().substr(0, 10),
      },
    },
  },
  relations: {
    friends: {
      type: "one-to-many",
      target: "Friend",
      inverseSide: "user",
      eager: true,
    },
  },
});
