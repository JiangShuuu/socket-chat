const express = require("express")
require("dotenv").config()
const app = express()
const socket = require("socket.io")

app.use(express.json())

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on Port ${process.env.PORT}`)
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
})

io.on("connection", (socket) => {
  console.log(socket.id)

  socket.on("join-room", (room, cb) => {
    socket.join(room)
    cb(`Joined ${room}`)
  })

  socket.on("disconnect", (reason) => {
    console.log(reason)
    socket.disconnect()
  })
})

// io.on('forceDisconnect', () => {
//   io.disconnect();
// });