import React, { useState, useContext, createContext } from 'react';

export const MenuContexts = createContext()

export const MenuProvider = ({ children }) => {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false)
  const [ messages, setMessages ] = useState([])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <MenuContexts.Provider value={{ isMenuOpen, toggleMenu, messages, setMessages }}>
      {children}
    </MenuContexts.Provider>
  )
}

export const useMenuToggleContext = () => useContext(MenuContexts)