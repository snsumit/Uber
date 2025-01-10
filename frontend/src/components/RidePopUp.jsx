import React from 'react'

const RidePopUp = ({confirmRide,ride,setRidePopupPanel,setConfirmRidePopupPanel}) => {
  return (
    <div>
       <h5 onClick={() => {
           
            setRidePopupPanel(false)
          }} className='text-center w-full absolute top-0 p-1 '><i className="text-2xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
          <h3 className='text-xl font-semibold mb-5 '>New Ride Available for you</h3>
        <div className='flex items-center justify-between mt-4 bg-yellow-300  p-4 rounded-xl'>
            <div className='flex items-center gap-4 '>
            <img className='w-12 rounded-full ' src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947" alt="" />
            <h2 className='text-lg font-medium'>{ride?.user?.fullName?.firstname + " " + ride?.user?.fullName?.lastname}</h2>
            
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>
          <div className='flex gap-2 justify-between items-center flex-col'>
           
            <div className='w-full mt-2 '>
                 <div className='flex gap-5 items-center p-2 border-b-2'>
                  <i className="text-lg ri-map-pin-fill"></i>
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
                 <i className="ri-currency-line"></i>
                  <div>
                     <h4 className='text-lg font-medium'>₹{ride?.fare}</h4>
                     <p className='text-sm text-gray-600 -mt-1'>Cash Cash</p>
                  </div>
                 </div>
            </div>
            <div className='flex w-screen  justify-evenly p-2  '>
            <button onClick={()=>{
               setConfirmRidePopupPanel(true)
               confirmRide()
            }} className='bg-green-600 w-2/5  text-white font-semibold p-2 rounded-lg' >Accept</button>  
            <button onClick={()=>{
               setRidePopupPanel(false)
            }} className='bg-gray-400 w-2/5  font-semibold p-2 rounded-lg' >ignore</button>  
            
            </div>
             
          </div>
    </div>
  )
}

export default RidePopUp
