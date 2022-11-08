const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model("Users", userSchema)