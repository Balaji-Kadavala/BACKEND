const router = require("express").Router();
const { addNewUser, getAllUsers } = require("../controllers/user-controller");
const UserModel = require("../model/user-model");

router.post("/submit", addNewUser)

router.get("/", getAllUsers)

module.exports = router;