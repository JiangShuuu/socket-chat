const { creatUser } = require("../controllers/usersController")

const router = require("express").Router()

router.post("/user", creatUser)

module.exports = router