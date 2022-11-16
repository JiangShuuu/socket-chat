import React, { useState, useEffect, useContext, createContext } from 'react';
import { useSocket } from '../hooks/useSocket';

export const SocketContexts = createContext()


export const SocketProvider = ({ children }) => {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false)
  const host = 'http://localhost:8000/'
  const socket = useSocket(host, {
    autoConnect: false
  })

  useEffect(() => {
    if (isMenuOpen) {
      socket.connect()
      SocketListener()
    } else {
      socket.close()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen, socket])

  // 監聽器
  const SocketListener = () => {
    // 送出 userId
    socket.emit("add-user", 'YellowCARD!!')
    // 連接
    socket.on("connect", () => {
      console.log(socket.id)
    })
    // 離開
    socket.on("disconnect", () => {
      console.log(socket.disconnected)
    })
  }

  const [ messages, setMessages ] = useState([])

  const toggleMenu = (value) => {
    setIsMenuOpen(value)
  }

  return (
    <SocketContexts.Provider value={{ isMenuOpen, toggleMenu, messages, setMessages }}>
      {children}
    </SocketContexts.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContexts)
