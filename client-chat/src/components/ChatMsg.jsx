import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import { v4 as uuidv4 } from "uuid";
import { useSocketContext } from '../context/SocketContext'

export default function ChatMsg({ socket }) {
  const { isMenuOpen, messages } = useSocketContext()
  const [ arrMsg, setArrMsg ] = useState([])
  
  // 接收訊息
  // socket.current.on("receive-msg", arrivalMsg => {
  //   console.log('get', arrivalMsg)
  // })

  // console.log(msg)

  return (
    <Container menu={isMenuOpen}>
      <div className='content'>
        <div className='chatbox'>
          <p>123</p>
          {/* {arrMsg.map((item, idx) => {
            return <p key={idx} className='text'>{item.msg}</p>
          })} */}
          {messages.map((item, idx) => {
            return <p key={idx} className='text-right'>{item.msg}</p>
          })}
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  transition: 0.5s;
  opacity: ${props => props.menu ? 1 : 0};
  .content {
    max-width: 600px;
    padding: 0 0 3.5rem 0;
    margin: auto;
    border-radius: 20px 20px 0 0;
    background-color: #ffffffa2;
    backdrop-filter: opacity(50%);
  }
  .chatbox {
    margin: 0 2rem;
  }
  .text {
    padding: 0.5rem 0;
  }
  .text-right {
    padding: 0.5rem 0;
    text-align: right;
  }
`
