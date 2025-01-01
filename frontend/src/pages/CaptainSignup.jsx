import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const CaptainSignup = () => {

const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [captainData,setCaptainData] = useState({})
       const handleFormSubmit = (e)=>{
         e.preventDefault()
         setCaptainData({
            fullName:{
                firstName,
                lastName,
            },
            email,
            password,
         })
         console.log(captainData)
         setFirstName('')
         setLastName('')
         setEmail('')
         setPassword('')
       }

  return (
    <div className='p-8 flex flex-col h-screen justify-between' >
    <div>
    <img className='w-20 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"   alt="" />
    <form autoComplete='false' onSubmit={handleFormSubmit}>
     <h3 className='text-lg font-medium mb-2'>What's our Captain's name</h3>
     <div className='flex gap-4 mb-5'>
     <input 
      required 
      type="text" 
      value={firstName}
      placeholder='First Name' 
      className='border  w-1/2 bg-[#eeeeee] py-2 px-4 rounded text-lg  placeholder:text-base '
      onChange={(e)=>{
         setFirstName(e.target.value)
      }}
      />
      <input 
      required 
      type="text" 
      value={lastName}
      placeholder='Last Name' 
      className='border w-1/2 bg-[#eeeeee] py-2 px-4 rounded text-lg placeholder:text-base '
      onChange={(e)=>{
         setLastName(e.target.value)
      }}
      />
     </div>
      
      
      
      
      <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
      <input 
      required 
      type="email" 
      value={email}
      placeholder='email@example.com' 
      className='border w-full bg-[#eeeeee] py-2 px-4 rounded text-lg mb-5 placeholder:text-base '
      onChange={(e)=>{
         setEmail(e.target.value)
      }}
      />
      <h3 className='text-lg mb-2 font-medium'>Enter Password</h3>
      <input 
      required 
      value={password}
      type="password"  
      placeholder='password' 
      className='border w-full bg-[#eeeeee] py-2 px-4 rounded text-lg mb-5 placeholder:text-base '
       onChange={(e)=>{
          setPassword(e.target.value)
       }}
      />
      <button className='w-full bg-black py-3 mb-3 px-4 text-white font-semibold rounded'>Sign Up</button>
   </form>
       <p className='text-base text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
    </div>
    <div>
     <p className='text-xs leading-tight '>This site is protected by reCaptcha and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of service apply</span></p>
    </div>
  
 </div>

  )
}

export default CaptainSignup
