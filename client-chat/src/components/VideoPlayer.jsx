import React, { useEffect, useState } from 'react'
import { useWebRtcContext } from '../context/WebRtcContext'
import styled from 'styled-components'

export default function VideoPlayer() {
  const {
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    answerCall,
    callUser,
    call,
    connecting,
    openVideoInfo,
    calling,
  } = useWebRtcContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (openVideoInfo === 'open' && myVideo) {
      setTimeout(() => {
        setLoading(false)
      }, 5000)
    }
  }, [openVideoInfo, myVideo])
  return (
    <VideoBox>
      <div className="videos">
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          className="videoMe"
        ></video>
        {callAccepted && !callEnded && (
          <video playsInline ref={userVideo} autoPlay className="videoOther" />
        )}
      </div>
      <div className="info">
        {loading ? (
          <p>讀取中...</p>
        ) : (
          <>
            {!callAccepted && (
              <button
                onClick={() => callUser()}
                disabled={call.isReceivingCall | connecting | calling}
              >
                準備好按下撥打給對方
              </button>
            )}
          </>
        )}

        {connecting && <h3>等待對方接聽中...</h3>}

        {calling && !call.isReceivingCall && <p>訊號接收中...</p>}

        {call.isReceivingCall && !callAccepted && (
          <div className="calling">
            <h2>對方打來中....</h2>
            <button onClick={answerCall}>接聽</button>
          </div>
        )}
      </div>
    </VideoBox>
  )
}

const VideoBox = styled.div`
  position: absolute;
  top: 2rem;
  z-index: 9999;
  text-align: center;
  button:disabled {
    color: gray;
    cursor: not-allowed;
  }
  button:hover:disabled {
    color: gray;
    background-color: unset;
    border-color: unset;
    cursor: not-allowed;
  }
  .videos {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  .videoMe {
    border-radius: 10px;
    width: 20%;
  }
  .videoOther {
    border-radius: 10px;
    width: 34%;
  }
  .info {
    padding-top: 1rem;
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
  @media only screen and (max-width: 600px) {
    .videos {
      flex-direction: column;
      gap: 0.5rem;
    }
    .videoMe {
      all: unset;
      border-radius: 10px;
      width: 25%;
    }
    .videoOther {
      all: unset;
      border-radius: 10px;
      width: 350px;
      height: 250px;
    }
  }
`
