import React, { useState, useEffect, useContext, createContext } from 'react'
import { useSocket } from '../hooks/useSocket'

export const SocketContexts = createContext()

export const SocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [start, setStart] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [room, setRoom] = useState('')
  const [end, setEnd] = useState(false)
  const [me, setMe] = useState('')
  const [talker, setTalker] = useState('')

  const host = process.env.REACT_APP_APIURL
  const socket = useSocket(host, {
    autoConnect: false,
  })

  // 開關
  useEffect(() => {
    if (isMenuOpen) {
      socket.connect()
      SocketListener()
    } else {
      socket.close()
      socket.off()
      setMessages([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen, socket])

  // 監聽器
  const SocketListener = () => {
    // 連接
    socket.on('connect', () => {
      setMe(socket.id)
      console.log(socket.id)
    })
    // 離開
    socket.on('disconnect', () => {
      console.log(socket.disconnected)
    })
    // 接收訊息
    socket.on('receive-msg', (arrivalMsg) => {
      console.log('get', arrivalMsg)
      setMessages((prev) => [...prev, { fromSelf: false, msg: arrivalMsg }])
    })
    // 可以聊天與否
    socket.on('start-connect', (msg) => {
      console.log('connectMsg', msg)
      setTimeout(() => {
        setTalker(msg.id)
        setStart(true)
      }, 1000)
    })
    // 離開聊天
    socket.on('connect-end', (msg) => {
      console.log('end', msg)
      setEnd(true)
      setStart(false)
      setMe('')
      setTalker('')
    })
  }
  // 開關
  const toggleMenu = (value) => {
    setIsMenuOpen(value)
  }

  return (
    <SocketContexts.Provider
      value={{
        socket,
        isMenuOpen,
        toggleMenu,
        messages,
        setMessages,
        room,
        setRoom,
        start,
        setStart,
        end,
        setEnd,
        me,
        setMe,
        talker,
        setTalker,
      }}
    >
      {children}
    </SocketContexts.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContexts)
