const User = require('../model/userModel')
const { v4: uuidv4 } = require('uuid');

module.exports.creatUser = async (req, res, next) => {
  try {
    let { userId } = req.body
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
    const userId = req.params.id

    if (!userId) {
      return res.json({ status: 404, err:'找不到使用者！' })
    }

    return User.findOne({ userId })
      .then(user => {

        if (!user) {
          return res.json({ status: 404, err:'找不到使用者！' })
        }

        user.delete()
        res.json({ status: true, err:'使用者已刪除！' })
      }).catch(err => {
        next(err)
      })

  } catch (error) {
    console.error(error)
    next(error)
  }
}