import React from 'react'
import styled from 'styled-components'

export default function ChatMsg() {
  return (
    <Container>
      <div className='content'>
        <div className='chatbox'>
          <p className='text'>ㄋ</p>
          <p className='text'>ㄋ</p>
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