const express = require("express");
const router = express.Router();
const AuthController = require("../controller/AuthController");
const authController = new AuthController();

router.get('/login', wrapAsyncController(authController.login));

module.exports = router;