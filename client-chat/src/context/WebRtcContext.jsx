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
  // 確認意願&回覆意願
  const [checkVideo, setCheckVideo] = useState()
  const [openVideoInfo, setOpenVideoInfo] = useState('')
  // 撥打中&接聽中
  const [connecting, setConnecting] = useState(false)
  const [calling, setCalling] = useState(false)

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  useEffect(() => {
    if (isMenuOpen) {
      // 視訊確認
      socket.on('videoConfirmCheck', (msg) => {
        // 開啟意願視窗
        setCheckVideo(true)
        setOpenVideoInfo('')
      })
      // 視訊同意與否
      socket.on('videoCheckResult', (msg) => {
        if (msg) {
          setOpenVideoInfo('open')
        } else {
          setOpenVideoInfo('reject')
        }
      })
    } else {
      if (stream) {
        stream.getTracks().forEach(function (track) {
          track.stop()
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen, socket])

  useEffect(() => {
    if (openVideoInfo === 'open') {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream)

          myVideo.current.srcObject = currentStream
        })
      socket.on('callUser', ({ fromId, signal }) => {
        setCall({ isReceivingCall: true, fromId, signal })
      })
      socket.on('calling', () => {
        setCalling(true)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openVideoInfo])

  const answerCall = () => {
    setCallAccepted(true)

    setCalling(false)

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
    setConnecting(true)

    const peer = new Peer({ initiator: true, trickle: false, stream })

    socket.emit('calling', talker)

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
      setConnecting(false)
      peer.signal(signal)
    })

    connectionRef.current = peer
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
        setCallEnded,
        answerCall,
        checkVideo,
        setCheckVideo,
        openVideoInfo,
        setOpenVideoInfo,
        connecting,
        setConnecting,
        calling,
        setCalling,
      }}
    >
      {children}
    </WebRtcContext.Provider>
  )
}

export const useWebRtcContext = () => useContext(WebRtcContext)
