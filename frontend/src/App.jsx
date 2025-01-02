import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'

const App = () => {
  
 
  return (
    <div>
        <Routes>
            <Route path='/' element={<Start />}/>
            <Route path='/login' element={<UserLogin />}/>
            <Route path='/signup' element={<UserSignup/>}/>
            <Route path='/captain-login' element={<Captainlogin />}/>
            <Route path='/captain-signup' element={<CaptainSignup />}/>
            <Route path='/home' element={
              <UserProtectedWrapper >  
                  <Home />
              </UserProtectedWrapper>
              } // wrapper so that only login user can access the home page
            />
            <Route path='/user/logout' element={ <UserProtectedWrapper>
               <UserLogout />
            </UserProtectedWrapper> }/>
            <Route path='/captain-home' element={<CaptainHome /> }/>
        </Routes>
    </div>
  )
}

export default App
