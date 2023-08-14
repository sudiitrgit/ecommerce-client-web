"use client"

import useUser from '@/hooks/use-user';
import axios from 'axios';
import { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import LogoutFunction from '@/actions/logout';

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
  
  useEffect( () => {    
      if(user.items.length === 1){
          setLogin(true)
      }else{
        setLogin(false)
      } 
      if(login){
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          data: {"userId": user.items[0].id, "accessToken": user.items[0].accessToken, "phone": user.items[0].phone}
        }).then(data => {
          
        }, error => {
            LogoutFunction()
            window.location.reload()
        })
      }
  }, [login, user.items.length, user.items])
  

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