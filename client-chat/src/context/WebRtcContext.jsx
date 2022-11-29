import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react'
import { useSocketContext } from './SocketContext'

export const WebRtcContext = createContext()

export const WebRtcProvider = ({ children }) => {
  const { socket, isMenuOpen, toggleMenu, setMessages, room, start } =
    useSocketContext()

  useEffect(() => {
    if (isMenuOpen) {
      console.log('開了拉')
    } else {
      console.log('關關關')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen, socket])
  return <WebRtcContext.Provider value={{}}>{children}</WebRtcContext.Provider>
}

export const useWebRtcContext = () => useContext(WebRtcContext)
