import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react'
import Peer from 'simple-peer'

import { useSocketContext } from './SocketContext'

export const WebRtcContext = createContext()

export const WebRtcProvider = ({ children }) => {
  const { socket, isMenuOpen, me, talker } = useSocketContext()

  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [stream, setStream] = useState()
  const [call, setCall] = useState({})

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  useEffect(() => {
    if (isMenuOpen) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream)

          myVideo.current.srcObject = currentStream
        })
      socket.on('callUser', ({ fromId, signal }) => {
        setCall({ isReceivingCall: true, fromId, signal })
      })
    } else {
      myVideo.current.srcObject = null
      if (stream) {
        stream.getTracks().forEach(function (track) {
          track.stop()
        })
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen, socket])

  // 接聽電話function
  const answerCall = () => {
    setCallAccepted(true)

    const peer = new Peer({ initiator: false, trickle: false, stream })

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.fromId })
    })

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    peer.signal(call.signal)

    connectionRef.current = peer
  }

  const callUser = () => {
    const peer = new Peer({ initiator: true, trickle: false, stream })

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: talker,
        signalData: data,
        from: me,
      })
    })

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  //  掛掉二次打 待解

  const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current.destroy()
  }

  return (
    <WebRtcContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        callEnded,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </WebRtcContext.Provider>
  )
}

export const useWebRtcContext = () => useContext(WebRtcContext)
