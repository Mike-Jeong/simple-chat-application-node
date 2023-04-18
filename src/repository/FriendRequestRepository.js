const express = require("express");
const { getConnection, getRepository } = require("typeorm");
const FriendReqiestEntity = require("../entity/FriendRequest");