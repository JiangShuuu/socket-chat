import React, {useState} from 'react'
// import { io } from 'socket.io-client'
import styled from "styled-components"
import Chat from '../components/Chat'
import { useMenuToggleContext } from '../context/MenuContext'

export default function Index() {
  const { isMenuOpen, toggleMenu } = useMenuToggleContext()

  return (
    <Container>
      <div className='container'>
        <h1>聊天吧</h1>
      </div>
      {isMenuOpen 
        ? <Chat /> 
        : <button className='startChat' onClick={toggleMenu}>開始聊天</button>
      }
    </Container>
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
    }
  }
  .startChat {
    all:unset;
    border: 1px solid #07688b;
    padding: 10px;
    font-size: 2rem;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.25s;
  }
  .startChat:hover {
    color: white;
    background-color: #07688b;
  }
`
