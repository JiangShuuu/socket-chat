const { creatUser, deleteUser } = require("../controllers/usersController")

const router = require("express").Router()

router.post("/user", creatUser)
router.delete("/user", deleteUser)

module.exports = router