const User = require('../model/userModel')
const { v4: uuidv4 } = require('uuid');

module.exports.creatUser = async (req, res, next) => {
  try {
    let { userId } = req.body
    console.log(userId)

    const userIdCheck = await User.findOne({ userId })
    
    if (userIdCheck) {
      userId = uuidv4();
    }

    const user = await User.create({ userId })

    return res.json({ status: true, user })
  } catch (error) {
    console.error(error)
    next(error)
  }
}