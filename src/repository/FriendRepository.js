const express = require("express");
const { getConnection, getRepository } = require("typeorm");
const FriendEntity = require("../entity/Friend");