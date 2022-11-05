import React, { useState, useContext, createContext } from 'react';

export const MenuContexts = createContext()

export const MenuProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <MenuContexts.Provider value={{ isMenuOpen, toggleMenu }}>
      {children}
    </MenuContexts.Provider>
  )
}

export const useMenuToggleContext = () => useContext(MenuContexts)