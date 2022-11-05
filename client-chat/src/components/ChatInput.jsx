import React from 'react'
import styled from 'styled-components'

export default function ChatInput() {
  return (
    <InputContainer>
      <button className='inputBtn'>離開</button>
      <input type="text" placeholder='請輸入訊息' />
      <button className='inputBtn'>傳送</button>
    </InputContainer>
  )
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #e1e0e0;
  height: 3rem;
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
  input {
    all: unset;
    background-color: white;
    text-indent: 1rem;
    height: 2.25rem;
    flex: 1 1 0%;
    border-radius: 2rem;
  }
`
