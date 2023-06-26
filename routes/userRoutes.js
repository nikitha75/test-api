const express = require("express");
const router = express.Router();
const { createUser, fetchUserEmail, updateAccessToken } = require("../controller/userController");



router.post("/create/user", createUser);
router.put("/user", updateAccessToken);
router.get("/user/:userId", fetchUserEmail);


module.exports = router;