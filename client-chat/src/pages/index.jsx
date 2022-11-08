import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import styled from "styled-components"
import Chat from '../components/Chat'
import { MenuProvider, useMenuToggleContext } from '../context/MenuContext'

const host = 'http://localhost:8000/'

function Index() {
  const { isMenuOpen, toggleMenu } = useMenuToggleContext()
  const [socket, setSocket] = useState()

  const connectSocket = () => {
    setSocket(io(host))
  }

  useEffect(() => {
    console.log('hi', socket)
    if (socket) {
      socket.on("connection", (sockets) => {
        console.log(sockets.id)
      })
    }
  }, [socket])

  return (
    <Container menu={isMenuOpen}>
      <div className='container'>
        <h1>聊天吧</h1>
      </div>
      <button className='startChat' onClick={connectSocket}>開始聊天</button>
      <Chat /> 
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
