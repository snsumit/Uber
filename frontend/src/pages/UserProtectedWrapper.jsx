import React, { useContext, useEffect } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'


// now it can possible if user refresh the page the data will get erase store in  the context 
//  so for that we should use the token instead of the user 

const UserProtectedWrapper = ({children}) => {
    
    const {user} = useContext(userDataContext);
    const token  = localStorage.getItem('token')  //get the token from the localStorage
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(!token){
           navigate('/login')
        }
    },[token])

    
        return (
            <div>
                {children}  
            </div>
          )

 
}

export default UserProtectedWrapper
