const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const userController = new UserController();
const authMiddleware = require("../middleware/authMiddleware");
const wrapAsyncController = require('../middleware/wrapAsyncController');

router.get('/', authMiddleware, wrapAsyncController(userController.getUsers));
router.post('/', authMiddleware, wrapAsyncController(userController.createUser));

module.exports = router;
