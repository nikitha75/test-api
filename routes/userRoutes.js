const express = require("express");
const router = express.Router();
const { createUser, fetchUserEmail, fetchUsers } = require("../controller/userController");



router.post("/create/user", createUser);
router.get("/user/:userId", fetchUserEmail);
router.get("/users", fetchUsers);



module.exports = router;