const express = require("express");
const router = express.Router();
const userRouter = require("./User.js");
const friendRouter = require("./Friend.js");
const requestRouter = require("./FriendRequest.js");

router.use("/users", userRouter);
router.use("/friends", friendRouter);
router.use("/friend-requests", requestRouter);

module.exports = router;