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
  const {
    socket,
    isMenuOpen,
    me,
    talker,
    toggleMenu,
    setMessages,
    room,
    start,
  } = useSocketContext()

  // 接聽電話
  const [callAccepted, setCallAccepted] = useState(false)
  // 結束電話
  const [callEnded, setCallEnded] = useState(false)
  // 放在video顯示的地方,還不確定作用
  const [stream, setStream] = useState()
  // 來電話
  const [call, setCall] = useState({})

  // 我的視窗
  const myVideo = useRef()
  // 對方的視窗
  const userVideo = useRef()
  // 給 Peer用的
  const connectionRef = useRef()

  useEffect(() => {
    if (isMenuOpen) {
      console.log('開了拉')
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream)

          myVideo.current.srcObject = currentStream
        })

      // wip
      socket.on('callUser', ({ fromId, signal }) => {
        console.log('我打得拉！', fromId, signal)
        setCall({ isReceivingCall: true, fromId, signal })
      })
    } else {
      myVideo.current.srcObject = null
      // connectionRef.current.destroy()

      // window.location.reload()
      console.log('關關關')
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
      // wip
      console.log('接聽者者signal', currentStream)
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
        // from: me,
        // name,
      })
    })

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    socket.on('callAccepted', (signal) => {
      console.log('撥打者signal', signal)
      setCallAccepted(true)
      // wip
      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true)

    connectionRef.current.destroy()

    window.location.reload()
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
