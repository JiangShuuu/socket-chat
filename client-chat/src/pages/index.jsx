import React, {useState, useEffect} from 'react'
import { io } from 'socket.io-client'

export default function Index() {
  const [id, setId] = useState('123')

  useEffect(() => {
    const socket = io('http://localhost:8000')
    socket.on('connect', () => {
      setId(socket.id)
    })
  }, [])

  return (
    <div>{id}</div>
  )
}
