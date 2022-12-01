require('dotenv').config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const socket = require("socket.io")
const userRoutes = require("./routes/userRoutes")
const PORT = process.env.PORT || 8000
const MONGODB = process.env.MONGO_URL
app.use(cors())
app.use(express.json())

app.use("/api", userRoutes)

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB Connection Successful")
}).catch(err => {
  console.log(err.message)
})

const server = app.listen(PORT, () => {
  console.log(`Server started on Port 8877`)
})

const io = socket(server, {
  cors: {
    origin: process.env.CORS_URL,
    credentials: true
  }
})

// 全域陣列
// 線上user
global.onlineUsers = new Map()
// 線上房間
global.onlineRooms = new Map()

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
  socket.on("join-room", (roomId, cb) => {
    // socket Map, 每次連線都會有一間, join也在這里
    const ioRoom = io.sockets.adapter.rooms
    // 展開成 array
    const roomArr = [...onlineRooms.keys()]

    if (roomArr.length >= 1) {
      const findRoom = roomArr.find(item => ioRoom.get(item).size < 2)
      if (!findRoom) {
        socket.join(roomId)
        onlineRooms.set(roomId, new Set([socket.id]))
        cb({id: roomId, status: 'connecting'})
        return
      }
      socket.join(findRoom)
      socket.to(findRoom).emit('start-connect', 'startChat')
      onlineRooms.get(findRoom).add(socket.id)
      cb({id: findRoom, status: 'success'})
    } else {
      socket.join(roomId)
      onlineRooms.set(roomId, new Set([socket.id]))
      cb({id: roomId, status: 'connecting'})
    }
  })

  socket.on("disconnect", (reason) => {
    // 刪除 onlineUser 
    onlineUsers.forEach((value, key) => {
      if (socket.id === value) {
        onlineUsers.delete(key)
      }
    })
    // 刪除 room & 送出離開消息
    onlineRooms.forEach((value, key) => {
      if (value.has(socket.id)) {
        socket.to(key).emit('connect-end', 'chatEnd')
        onlineRooms.delete(key)
      }
    })
    console.log('onlineRooms leave', onlineRooms)
    console.log('onlineUsers Leave', onlineUsers)
    socket.disconnect()
  })
})