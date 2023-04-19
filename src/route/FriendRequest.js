const express = require("express");
const router = express.Router();
const FriendRequestController = require("../controller/FriendRequestController");
const friendRequestController = new FriendRequestController();
const wrapAsyncController = require('../middleware/wrapAsyncController');

router.get('/', wrapAsyncController(friendRequestController.getFriendRequests));
router.post('/', wrapAsyncController(friendRequestController.createFriendRequest));
router.patch('/', wrapAsyncController(friendRequestController.processFriendRequest));

module.exports = router;
