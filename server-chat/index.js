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

io.on("connection", (socket) => {
  console.log(socket.id)
  socket.on("msg", (msg, cb) => {
    cb(`Msg: ${msg}`)
  })

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