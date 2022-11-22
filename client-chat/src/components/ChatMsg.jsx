import React from 'react'
import styled from 'styled-components'
import { useSocketContext } from '../context/SocketContext'

export default function ChatMsg() {
  const { isMenuOpen, messages, start } = useSocketContext()

  return (
    <Container menu={isMenuOpen}>
      <div className="content">
        <div className="chatbox">
          {start ? <p>開始聊天！！</p> : <p>找尋中...</p>}

          {messages.map((item, idx) => {
            return (
              <div
                key={idx}
                className={item.fromSelf ? 'text-right' : 'text-left'}
              >
                <p className="text">{item.msg}</p>
              </div>
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
    padding: 0 0 4rem 0;
    margin: auto;
    border-radius: 20px 20px 0 0;
    background-color: #ffffffa2;
    backdrop-filter: opacity(50%);
  }
  .chatbox {
    margin: 0 2rem;
    max-height: 80vh;
    overflow: scroll;
  }
  .chatbox::-webkit-scrollbar {
    display: none;
  }
  .text {
    border: 1px solid;
    border-radius: 10px;
    padding: 0.5rem;
    background: gray;
    color: white;
  }
  .text-left {
    display: flex;
    justify-content: start;
    padding: 0.25rem 0;
  }
  .text-right {
    display: flex;
    justify-content: end;
    padding: 0.25rem 0;
  }
`
