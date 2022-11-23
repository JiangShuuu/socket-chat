import React, { useState, useEffect, useContext, createContext } from 'react'
import { useSocket } from '../hooks/useSocket'

export const SocketContexts = createContext()

export const SocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [start, setStart] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [room, setRoom] = useState('')

  const host = 'http://localhost:8000/'
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
      setStart(true)
    })
    socket.on('connect-end', (msg) => {
      console.log('end', msg)
      setStart(false)
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
      }}
    >
      {children}
    </SocketContexts.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContexts)
