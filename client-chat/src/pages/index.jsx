import React, {useState} from 'react'
import { io } from 'socket.io-client'

// https://ms314006.github.io/use-websocket-by-react-socket-io/

export default function Index() {
  const [socket, setSocker] = useState(null)
  const [id, setId] = useState('尚未連線')
  const [room, setRoom] = useState('NoRoom')
  
  const connect = () => {
    setSocker(io('http://localhost:8000'))
  }

  const join = () => {
    socket.emit('join-room', 'sadsa' , (msg) => {
      setRoom(msg)
    })
  }

  const close = () => {
    // socket.disconnect()
    // socket.on('disconnect', (msg) => {
    //     console.log( 'disconnected to server', msg );
    // } );
  }


  return (
    <>
      <div>ID: {id}</div>
      <div>Room: {room}</div>
      <input type="text"  />
      <button onClick={connect}>開始連線</button>
      <button onClick={join}>加入房間</button>
      <button onClick={close}>斷開連線</button>
    </>
  )
}
