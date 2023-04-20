const express = require("express");
const router = express.Router();
const userRouter = require("./User");
const friendRouter = require("./Friend");
const requestRouter = require("./FriendRequest");
const authRouter = require("./Authentication");

router.use("/users", userRouter);
router.use("/friends", friendRouter);
router.use("/friend-requests", requestRouter);
router.use("/auth", authRouter);

module.exports = router;