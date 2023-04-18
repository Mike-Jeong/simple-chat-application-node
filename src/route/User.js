const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const userController = new UserController();
const wrapAsyncController = require('../middleware/wrapAsyncController');

router.get('/',wrapAsyncController(userController.getUsers));

module.exports = router;
