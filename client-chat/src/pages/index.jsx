import React, {useState} from 'react'
// import { io } from 'socket.io-client'
import styled from "styled-components"
export default function Index() {



  return (
    <Container>
      <div className='container'>
        <h1>聊天吧</h1>
      </div>
      <button>開始聊天</button>
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
  .container {
    h1 {
      color: #76bad2;
    }
  }
  button {
    all:unset;
    border: 1px solid #76bad2;
    padding: 10px;
    font-size: 2rem;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.25s;
  }
  button:hover {
    color: white;
    background-color: #76bad2;
  }
`
