const express = require("express");
const router = express.Router();
const FriendController = require("../controller/FriendController");
const friendController = new FriendController();
const authMiddleware = require("../middleware/authMiddleware");
const wrapAsyncController = require('../middleware/wrapAsyncController');

router.get('/', authMiddleware, wrapAsyncController(friendController.getFriends));
router.delete('/', authMiddleware, wrapAsyncController(friendController.deleteFriend));

module.exports = router;