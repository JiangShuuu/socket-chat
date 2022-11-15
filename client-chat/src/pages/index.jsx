import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import styled from "styled-components"
import Chat from '../components/Chat'
import { v4 as uuidv4 } from 'uuid'
import { MenuProvider, useMenuToggleContext } from '../context/MenuContext'
import userAPI  from "../apis/user";

const host = 'http://localhost:8000/'

function Index() {
  const [userId, setUserId] = useState()
  const { isMenuOpen, toggleMenu } = useMenuToggleContext()
  const socket = useRef(null)
  const [msg, setMsg] = useState([])
  
  socket.current = io(host, {
    autoConnect: false
  })
  

  useEffect(() => {
    if (userId) {
      // 連線
      socket.current.connect()
      // 送出 userId
      socket.current.emit("add-user", userId)
      // 連接
      socket.current.on("connect", () => {
        console.log(socket.current.id)
      })
      // 接收訊息
      socket.current.on("receive-msg", arrivalMsg => {
        console.log('get', arrivalMsg)
        // console.log(msg)
      })
      // 離開
      socket.current.on("disconnect", () => {
        console.log(socket.current.disconnected)
      })
    }
  }, [userId, socket])

  const connectSocket = async () => {
    toggleMenu()

    // uuid
    const user = uuidv4()

    // create User
    const { data } = await userAPI.createUser(user)
 
    if (data.status) {
      setUserId(data.connectId)
    }
  }

  const msgBtn = () => {
    socket.current.volatile.emit('msg', 'hihihi', msg => {
      console.log(msg)
    })
  }

  // const addRoom = () => {
  //   socket.current.emit('join-room', '1234', msg => {
  //     console.log(msg)
  //   })
  // }

  return (
    <Container menu={isMenuOpen}>
      <div className='container'>
        <h1>聊天吧</h1>
      </div>
      <button className='startChat' onClick={connectSocket}>開始聊天</button>
      <button className='startChat' onClick={msgBtn}>送出訊息</button>
      <Chat socket={socket} userId={userId} msg={msg} /> 
    </Container>
  )
}

export default function ContextIndex () {
  return (
    <MenuProvider>
      <Index />
    </MenuProvider>
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
      opacity: ${props => props.menu ? 0.5 : 1};
      transition: .5s;
    }
  }
  .startChat {
    all:unset;
    border: 1px solid #07688b;
    padding: 10px;
    font-size: 2rem;
    border-radius: 10px;
    cursor: pointer;
    z-index: 99;
    transition: 0.25s;
    opacity: ${props => props.menu ? 0 : 1};
  }
  .startChat:hover {
    color: white;
    background-color: #07688b;
  }
`
