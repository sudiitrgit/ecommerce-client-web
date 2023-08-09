"use client"

import { useState, createContext, useContext, useEffect, ReactNode } from 'react';

interface ContextProps {
  login: boolean;
  setLogin: (login: boolean) => void;
}

interface Props {
  children?: ReactNode
}

export const GlobalContext = createContext<ContextProps>({
  login: false,
  setLogin: () => {},
});

export const GlobalContextProvider = ({ children }: Props) => {
  const [login, setLogin] = useState(false);
  
  useEffect(() => {    
      const userInfo = localStorage.getItem("user")
      if(userInfo){
          setLogin(true)
      }   
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        login,
        setLogin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)