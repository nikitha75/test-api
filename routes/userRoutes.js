const express = require("express");
const router = express.Router();
const { createUser, fetchUserEmail, fetchUsers, generateRefreshToken, verifyAuthentication } = require("../controller/userController");



router.post("/create/user", createUser);
router.get("/user/:userId", verifyAuthentication, fetchUserEmail);
router.get("/users", fetchUsers);
router.put("/user", generateRefreshToken);


module.exports = router;