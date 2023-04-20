const express = require("express");
const router = express.Router();
const FriendRequestController = require("../controller/FriendRequestController");
const friendRequestController = new FriendRequestController();
const authMiddleware = require("../middleware/authMiddleware");
const wrapAsyncController = require('../middleware/wrapAsyncController');

router.get('/', authMiddleware, wrapAsyncController(friendRequestController.getFriendRequests));
router.post('/', authMiddleware, wrapAsyncController(friendRequestController.createFriendRequest));
router.patch('/', authMiddleware, wrapAsyncController(friendRequestController.processFriendRequest));

module.exports = router;
