import React, { useContext, useEffect, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// now it can possible if user refresh the page the data will get erase store in  the context 
//  so for that we should use the token instead of the user 

const UserProtectedWrapper = ({children}) => {
    
    const {user,setUser} = useContext(userDataContext);
    const token  = localStorage.getItem('token')  //get the token from the localStorage
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(!token){
           navigate('/login')
        }
    },[token])

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((response)=>{
             if(response.status === 200){
              setUser(response.data.user)
              setIsLoading(false)
            }
        }).catch((error)=>{
             localStorage.removeItem('token')
             
        },[token])

    })
      if(isLoading){
        return (
            <div>Loading....</div>
        )
      }
    
        return (
            <div>
                {children}  
            </div>
          )

 
}

export default UserProtectedWrapper
