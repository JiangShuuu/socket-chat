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

    return res.json({ status: true, connectId: user.userId })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.body
    User.findOne({ userId })
      .then(user => {
        if (!user) {
          return res.json({ status: 404, err:'找不到使用者！' })
        }
        user.delete()
      })
    return res.json({ status: true, err:'使用者已刪除！' })
  } catch (error) {
    console.error(error)
    next(error)
  }
}