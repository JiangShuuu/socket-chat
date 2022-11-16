import React from 'react'
import styled from 'styled-components'
import { useSocketContext } from '../context/SocketContext'
import userAPI  from "../apis/user";
import { useState } from 'react';

export default function ChatInput({ userId }) {
  const { socket, isMenuOpen, toggleMenu, setMessages } = useSocketContext()
  const [msg, setMsg] = useState("")

  const leaveBtn = async () => {
    // 加判斷式做另外的function
    const { data } = await userAPI.deleteUser(userId)
    console.log(data)
    toggleMenu(false)
  }

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      socket.emit("send-msg", msg)
      setMessages((prev) => [...prev, { msg }] )
      setMsg("");
    }
  };

  return (
    <InputContainer menu={isMenuOpen}>
      <div className='box'>
        <form className="input-container" onSubmit={(event) => sendChat(event)}>
          <button className='inputBtn' onClick={leaveBtn}>離開</button>
          <input
            type="text"
            placeholder="聊些什麼吧？"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button type="submit" className='inputBtn'>傳送</button>
        </form>
      </div>
    </InputContainer>
  )
}

const InputContainer = styled.div`
  .box {
    position: fixed;
    bottom: 0px;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #e1e0e0;
    height: 3rem;
    opacity: ${props => props.menu ? 1 : 0};
    transition: 0.5s;
  }
  .inputBtn {
    all: unset;
    color: #07688b;
    padding: 0 0.5rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: 0.2s;
  }
  .inputBtn:hover {
    color: #000000;
  }
  .input-container {
    display: flex;
    width: 100%;
  }
  input {
    all: unset;
    background-color: white;
    text-indent: 1rem;
    height: 2.25rem;
    width: 100%;
    flex: 1 1 0;
    border-radius: 2rem;
  }
`
