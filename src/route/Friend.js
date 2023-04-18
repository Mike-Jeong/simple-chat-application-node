const express = require("express");
const router = express.Router();
const FriendController = require("../controller/FriendController");
const friendController = new FriendController();
const wrapAsyncController = require('../middleware/wrapAsyncController');

router.get(wrapAsyncController(friendController.getFriends));
router.delete(wrapAsyncController(friendController.deleteFriend));