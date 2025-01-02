import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainSignup = () => {



   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('')
   const [vehicleColor, setVehicleColor] = useState('')
   const [vehiclePlate, setVehiclePlate] = useState('')
   const [vehicleCapacity, setVehicleCapacity] = useState('')
   const [vehicleType, setVehicleType] = useState('')

  const {captain,setCaptain} = useContext(CaptainDataContext)

  const navigate = useNavigate()
   
   const [captainData, setCaptainData] = useState({})
   const handleFormSubmit = async (e) => {
      e.preventDefault()
      const captainData = {
         fullName:{
            firstname:firstName,
            lastname:lastName,
         },
         email,
         password,
         vehicle:{
             color:vehicleColor,
             plate:vehiclePlate,
             capacity:vehicleCapacity,
             vehicleType:vehicleType
         }
      }
         
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,captainData)

      if(response.status===201){
         const data = response.data
         setCaptain(data.captain)
         localStorage.setItem('token',data.token)
         navigate('/captain-home')
      }

      console.log(captainData)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleCapacity('')
      setVehicleType('')
   }

   return (
      <div className='p-8 flex flex-col h-screen justify-between' >
         <div>
            <img className='w-20 mb-3' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <form autoComplete='false' onSubmit={handleFormSubmit}>
               <h3 className='text-lg font-medium mb-2'>What's our Captain's name</h3>
               <div className='flex gap-4 mb-5'>
                  <input
                     required
                     type="text"
                     value={firstName}
                     placeholder='First Name'
                     className='border  w-1/2 bg-[#eeeeee] py-2 px-4 rounded text-lg  placeholder:text-base '
                     onChange={(e) => {
                        setFirstName(e.target.value)
                     }}
                  />
                  <input
                     required
                     type="text"
                     value={lastName}
                     placeholder='Last Name'
                     className='border w-1/2 bg-[#eeeeee] py-2 px-4 rounded text-lg placeholder:text-base '
                     onChange={(e) => {
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
                  className='border w-full bg-[#eeeeee] py-2 px-4 rounded text-lg mb-2 placeholder:text-base '
                  onChange={(e) => {
                     setEmail(e.target.value)
                  }}
               />
               <h3 className='text-lg mb-2 font-medium'>Enter Password</h3>
               <input
                  required
                  value={password}
                  type="password"
                  placeholder='password'
                  className='border w-full bg-[#eeeeee] py-2 px-4 rounded text-lg mb-2 placeholder:text-base '
                  onChange={(e) => {
                     setPassword(e.target.value)
                  }}
               />
               <h3 className='text-lg mb-2 font-medium'>Vehicle Information</h3>
               <div className='flex  gap-4 mb-5'>
                  <input
                     required
                     value={vehicleColor}
                     type="text"
                     placeholder='Vehicle Color'
                     className='border w-1/2 bg-[#eeeeee] py-2 px-4 rounded text-lg  placeholder:text-base '
                     onChange={(e) => {
                       setVehicleColor(e.target.value)
                     }}
                  />
                  <input
                     required
                     value={vehiclePlate}
                     type="text"
                     placeholder='Vehicle Plate'
                     className='border w-1/2 bg-[#eeeeee] py-2 px-4 rounded text-lg placeholder:text-base '
                     onChange={(e) => {
                        setVehiclePlate(e.target.value)
                     }}
                  />
                 
               </div>

               <div className='flex gap-4 mb-5'>
                  <input
                     required
                     value={vehicleCapacity}
                     type="number"
                     placeholder='Vehicle Capacity'
                     className='border w-1/2 bg-[#eeeeee] py-2 px-4 rounded text-lg  placeholder:text-base '
                     onChange={(e) => {
                        setVehicleCapacity(e.target.value)
                     }}
                  />
                  <select 
                  required
                  className='border w-1/2 bg-[#eeeeee] py-2 px-4 rounded text-lg  placeholder:text-base '
                  value={vehicleType}
                  onChange={(e)=>{
                     setVehicleType(e.target.value)
                  }}          
                  >
                  <option value="" disabled >Select Vehicle Type</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="moto">Moto</option>


                  </select>
               </div>
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
