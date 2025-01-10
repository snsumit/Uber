import React, { createContext, useState } from 'react'
export const userDataContext = createContext()


  const UserContext = ({children}) => {
  const [user ,setUser] = useState({
    email:'',
    fullName:{
        firstname:'',
        lastname:'',
    }
  })
  const [hasFetchedUser, setHasFetchedUser] = useState(false);

    return (
    <div>
        <userDataContext.Provider value={{user ,setUser,hasFetchedUser, setHasFetchedUser}}>
           {children}
        </userDataContext.Provider>
        
    </div>
  )
}

export default UserContext
