"use client"

import useUser from '@/hooks/use-user';
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
  const user = useUser()
  
  useEffect(() => {    
      if(user.items.length === 1){
          setLogin(true)
      }else{
        setLogin(false)
      } 
  }, [login, user.items.length])

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