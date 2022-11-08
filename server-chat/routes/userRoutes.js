const { getUUID } = require("../controllers/usersController")

const router = require("express").Router()

router.get("/getuuid", getUUID)

module.exports = router