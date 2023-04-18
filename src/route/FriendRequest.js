const express = require("express");
const router = express.Router();
const FriendRequestController = require("../controller/FriendRequestController");
const friendRequestController = new FriendRequestController();
const wrapAsyncController = require('../middleware/wrapAsyncController');

/*router.get(wrapAsyncController(friendRequestController.getFriendRequests));
router.post(wrapAsyncController(friendRequestController.createFriendRequests));
router.patch(wrapAsyncController(friendRequestController.processFriendRequests));*/
