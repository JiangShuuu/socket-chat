import React from 'react'
import { useWebRtcContext } from '../context/WebRtcContext'
import styled from 'styled-components'

export default function VideoPlayer() {
  const {
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    answerCall,
    leaveCall,
    call,
  } = useWebRtcContext()

  // const {
  //   call,
  //   callAccepted,
  //   userVideo,
  //   callEnded,
  //   callUser,
  //   leaveCall,
  //   answerCall,
  // } = useWebRtcContext()

  return (
    <VideoBox>
      <div className="videos">
        <video playsInline muted ref={myVideo} autoPlay></video>
        {callAccepted && !callEnded && (
          <video playsInline ref={userVideo} autoPlay />
        )}
      </div>
      <div className="info">
        {call.isReceivingCall && !callAccepted && (
          <div className="calling">
            <h2>對方打來中....</h2>
            <button onClick={answerCall}>接聽</button>
          </div>
        )}
        {callAccepted && !call.isReceivingCall && (
          <button onClick={() => leaveCall()}>結束視訊</button>
        )}
      </div>
    </VideoBox>
  )
}

const VideoBox = styled.div`
  position: absolute;
  top: 2rem;
  z-index: 9999;
  .videos {
    display: flex;
  }
  video {
    border: 1px solid;
    width: 500px;
  }
  .calling {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    padding: 0.5rem;
  }
  button {
    all: unset;
    border: 1px solid;
    padding: 0.25rem;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    color: white;
    background-color: #00aeffbc;
    border-color: #00aeffbc;
  }
`
