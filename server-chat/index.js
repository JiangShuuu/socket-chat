const express = require("express")
require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const socket = require("socket.io")
const userRoutes = require("./routes/userRoutes")

app.use(cors())
app.use(express.json())

app.use("/api", userRoutes)

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB Connection Successful")
}).catch(err => {
  console.log(err.message)
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on Port ${process.env.PORT}`)
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
})


// 全域陣列
// 線上user
global.onlineUsers = new Map()
// 線上房間
global.onlineRooms = []

io.on("connection", (socket) => {
  console.log(socket.id)
  const ids = io.allSockets();

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id)
    console.log('onlineUsers', onlineUsers)
  })

  socket.on("send-msg", (msg, room) => {
    if (!room) {
      socket.emit("receive-msg", msg)
      console.log('other', msg)
    } else {
      socket.to(room).emit("receive-msg", msg)
      console.log('new', room, msg)
    }
  })

  // 加入或創建(改map)
  socket.on("join-room", (room, cb) => {
    if (onlineRooms.length >= 1 ) {
      socket.join(onlineRooms[0])
      cb(onlineRooms[0])
    } else {
      socket.join(room)
      onlineRooms.push(room)
      cb(room)
    }
  })

  socket.on("disconnect", (reason) => {
    console.log(reason, socket.id)
    onlineUsers.forEach((value, key) => {
      if (socket.id === value) {
        onlineUsers.delete(key)
      }
    })
    console.log('onlineUsers Leave', onlineUsers)
    socket.disconnect()
  })
})