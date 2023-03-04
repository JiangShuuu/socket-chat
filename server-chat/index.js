require('dotenv').config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const socket = require("socket.io")
const userRoutes = require("./routes/userRoutes")
const PORT = process.env.PORT || 8000
const MONGODB = process.env.MONGO_URL
const User = require('./model/userModel')

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
  console.log(`Server started on Port ${PORT}`)
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

// 移除 user
const delUser = (userId) => {
  User.findOne({ userId }).then(user => {
    if (user) return user.delete()
  })
}

io.on("connection", (socket) => {
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id)
    console.log('onlineUsers', onlineUsers)
  })

  socket.on("send-msg", (msg, room) => {
    if (!room) {
      socket.emit("receive-msg", msg)
    } else {
      socket.to(room).emit("receive-msg", msg)
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
        cb({id: socket.id, status: 'connecting'})
        return
      }
      socket.join(findRoom)
      // 送出連線者的id
      socket.to(findRoom).emit('start-connect', { msg:'startChat', id: socket.id } )
      onlineRooms.get(findRoom).add(socket.id)

      // 拿到加入房間的房長id
      const roomOwnerId = onlineRooms.get(findRoom).values().next().value
      cb({id: findRoom, roomid: roomOwnerId, status: 'success'})
    } else {
      socket.join(roomId)
      onlineRooms.set(roomId, new Set([socket.id]))
      cb({id: roomId, status: 'connecting'})
    }
  })

  socket.on('videoConfirm', room => {
    socket.to(room).emit('videoConfirmCheck', 'checkVideoConfirm')
  })

  socket.on('videoCheckInfo', data => {
    socket.to(data.room).emit('videoCheckResult', data.result)
  })

  socket.on("callUser", ({ userToCall, signalData, from }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, fromId: from });
	});

  socket.on("calling", (talker) => {
    socket.to(talker).emit("calling")
  })

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});

  socket.on("leve", (data) => {
    console.log('gete', data)
  })

  socket.on("disconnect", (reason) => {
    // 刪除 onlineUser 
    onlineUsers.forEach((value, key) => {
      if (socket.id === value) {
        onlineUsers.delete(key)
        delUser(key)
      }
    })
    // 刪除 room & 送出離開消息
    onlineRooms.forEach((value, key) => {
      if (value.has(socket.id)) {
        socket.to(key).emit('connect-end', 'chatEnd')
        onlineRooms.delete(key)
      }
    })
    socket.disconnect()
  })
})