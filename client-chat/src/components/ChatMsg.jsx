import React from 'react'
import styled from 'styled-components'
import { useMenuToggleContext } from '../context/MenuContext'

export default function ChatMsg() {
  const { isMenuOpen } = useMenuToggleContext()

  return (
    <Container menu={isMenuOpen}>
      <div className='content'>
        <div className='chatbox'>
          <p className='text'>ㄋ</p>
          <p className='text'>ㄋ</p>
          <p className='text'>ㄌ</p>
          <p className='text'>ㄌ</p>
          <p className='text'>ㄌ</p>
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