import React from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import ChatMsg from './ChatMsg'

export default function Chat() {
  return (
    <Container>
      <ChatMsg />
      <ChatInput />
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`
