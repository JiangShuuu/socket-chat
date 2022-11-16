import React from 'react'
import styled from 'styled-components'
import { useSocketContext } from '../context/SocketContext'

export default function ChatMsg() {
  const { isMenuOpen, messages } = useSocketContext()

  return (
    <Container menu={isMenuOpen}>
      <div className="content">
        <div className="chatbox">
          <p>123</p>
          {messages.map((item, idx) => {
            return (
              <p
                key={idx}
                className={item.fromSelf ? 'text-right' : 'text-left'}
              >
                {item.msg}
              </p>
            )
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
  opacity: ${(props) => (props.menu ? 1 : 0)};
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
  .text-left {
    padding: 0.5rem 0;
  }
  .text-right {
    padding: 0.5rem 0;
    text-align: right;
  }
`
