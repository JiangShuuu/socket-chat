import React from 'react'
import styled from 'styled-components'
import { useMenuToggleContext } from '../context/MenuContext'

export default function ChatInput() {
  const { isMenuOpen, toggleMenu } = useMenuToggleContext()

  return (
    <InputContainer menu={isMenuOpen}>
      <div className='box'>
        <button className='inputBtn' onClick={toggleMenu}>離開</button>
        <input type="text" placeholder='請輸入訊息' />
        <button className='inputBtn'>傳送</button>
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
    opacity: ${props => props.menu ? 0 : 1};
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
  input {
    all: unset;
    background-color: white;
    text-indent: 1rem;
    height: 2.25rem;
    flex: 1 1 0%;
    border-radius: 2rem;
  }
`
