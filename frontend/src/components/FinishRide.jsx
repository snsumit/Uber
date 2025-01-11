import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishRide = ({ride,setFinishRidePopupPanel}) => {

  const navigate = useNavigate()
  const endRide = async () => {
    const response =  await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
      rideId:ride?._id
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    } )
    
    if(response.status === 200){
      setFinishRidePopupPanel(false)
      navigate('/captain-home')
    }
   
  }


  return (
    <div>
           <h5 onClick={() => {
           setFinishRidePopupPanel(false)
        
         }} className='text-center w-full absolute top-0 p-1 '><i className="text-2xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
         <h3 className='text-xl font-semibold mb-5 mt-4 '>Finish this Ride</h3>
       <div className='flex items-center justify-between mt-4 bg-yellow-300  p-4 rounded-xl '>
           <div className='flex items-center gap-4 '>
           <img className='w-12 rounded-full ' src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947" alt="" />
           <h2 className='text-lg font-medium'>{ride?.user?.fullName?.firstname + " " + ride?.user?.fullName?.lastname }</h2>
           
           </div>
           <h5 className='text-lg font-semibold'>2.2 KM</h5>
       </div>
         <div className='flex gap-2 justify-between items-center flex-col mt-4'>
          
           <div className='w-full mt-2 '>
                <div className='flex gap-5 items-center p-2 border-b-2'>
                 <i class="text-lg ri-map-pin-fill"></i>
                 <div>
                    <h4 className='text-lg font-medium'>PickUp Point</h4>
                    <p className='text-sm text-gray-600 -mt-1'>{ride?.pickup}</p>
                 </div>
                </div>
                <div className='flex gap-5 items-center p-2 border-b-2'>
                <i className="text-lg ri-map-pin-fill"></i>
                 <div>
                    <h4 className='text-lg font-medium'>Destination</h4>
                    <p className='text-sm text-gray-600 -mt-1'>{ride?.destination}</p>
                 </div>
                </div>
                <div className='flex gap-5 items-center p-2'>
                <i class="ri-currency-line"></i>
                 <div>
                    <h4 className='text-lg font-medium'>₹{ride?.fare}</h4>
                    <p className='text-sm text-gray-600 -mt-1'>Cash Cash</p>
                 </div>
                </div>
           </div>
           <div className=' w-screen mt-6 p-4'>
           
           
           <button onClick={endRide} className='bg-green-600 w-full inline-block  text-center text-white font-semibold p-2 rounded-lg' >Finish Ride</button>  
          
           
           
           </div>
            
         </div>
 
    </div>
  )
}

export default FinishRide
