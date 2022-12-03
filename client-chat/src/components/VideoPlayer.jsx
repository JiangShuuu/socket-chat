import React from 'react'
import { useWebRtcContext } from '../context/WebRtcContext'
import styled from 'styled-components'

export default function VideoPlayer() {
  const { callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useWebRtcContext()

  return (
    <VideoBox>
      <h3>myPlayer</h3>
      <video playsInline muted ref={myVideo} autoPlay></video>
    </VideoBox>
  )
}

const VideoBox = styled.div`
  video {
    border: 1px solid;
    width: 500px;
  }
`
