import React from 'react'
import { useEffect } from 'react';
import styled from 'styled-components'
import { v4 as uuidv4 } from "uuid";
import { useMenuToggleContext } from '../context/MenuContext'

export default function ChatMsg({ socket, msg }) {
  const { isMenuOpen } = useMenuToggleContext()
  useEffect(() => {
    console.log('chat', msg)
  }, [msg])

  return (
    <Container menu={isMenuOpen}>
      <div className='content'>
        <div className='chatbox'>
          <p>123</p>
          <p>123</p>
          {/* {msg.map((item) => {
            return <p key={uuidv4()} className='text'>{item.msg}</p>
          })} */}
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
`