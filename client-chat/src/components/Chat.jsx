import React from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'

export default function Chat() {
  return (
    <Container>
      <div>Chat</div>
      <ChatInput />
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`
