import React, { useState } from 'react'
import styled from 'styled-components'
import Chat from '../components/Chat'
import { v4 as uuidv4 } from 'uuid'
import { SocketProvider, useSocketContext } from '../context/SocketContext'
import userAPI from '../apis/user'

function Index() {
  const [userId, setUserId] = useState()
  const { socket, isMenuOpen, toggleMenu, setRoom } = useSocketContext()

  const connectSocket = async () => {
    // 開啟並連線
    toggleMenu(true)

    // uuid
    const user = uuidv4()

    // create User
    const { data } = await userAPI.createUser(user)

    if (data.status) {
      setUserId(data.connectId)
      // 送出 userId
      socket.emit('add-user', data.connectId)
      // 加入或創建房間
      addRoom()
    }
  }

  const addRoom = () => {
    socket.emit('join-room', socket.id, (msg) => {
      console.log('room', msg)
      setRoom(msg)
    })
  }

  return (
    <Container menu={isMenuOpen}>
      <div className="container">
        <h1>聊天吧</h1>
      </div>
      <button className="startChat" onClick={connectSocket}>
        開始聊天
      </button>
      <Chat userId={userId} />
    </Container>
  )
}

export default function ContextIndex() {
  return (
    <SocketProvider>
      <Index />
    </SocketProvider>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  background-image: linear-gradient(to bottom right, #9bc8ff, #f9d185);
  .container {
    h1 {
      color: #07688b;
      font-size: 4rem;
      opacity: ${(props) => (props.menu ? 0.5 : 1)};
      transition: 0.5s;
    }
  }
  .startChat {
    all: unset;
    border: 1px solid #07688b;
    padding: 10px;
    font-size: 2rem;
    border-radius: 10px;
    cursor: pointer;
    z-index: 99;
    transition: 0.25s;
    opacity: ${(props) => (props.menu ? 0 : 1)};
  }
  .startChat:hover {
    color: white;
    background-color: #07688b;
  }
`
