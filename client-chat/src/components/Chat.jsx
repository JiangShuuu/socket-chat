import React from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import ChatMsg from './ChatMsg'

export default function Chat({ userId, socket, msg }) {
  return (
    <Container>
      <ChatMsg socket={socket} msg={msg} />
      <ChatInput socket={socket} userId={userId} />
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
