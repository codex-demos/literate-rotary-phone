import { createContext, useContext, useState } from 'react';


const UserContext = createContext()
export function UserProvider({children}){

  const [user, setUser] = useState(null)
  function login(userObject){
    setUser(userObject)
  }

  return(
    <UserContext.Provider value={user, login}>{children}</UserContext.Provider>
  )
}

export function useUser(UserContext){
  return useContext(UserContext)
}