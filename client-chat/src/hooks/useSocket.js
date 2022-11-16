import { useEffect, useRef } from 'react'
import io from 'socket.io-client'

export const useSocket = (url, options) => {
  const { current: socket } = useRef(io(url, options))

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [socket])

  return socket
}
