import React from 'react'

const WaitingForDriver = ({ride,setWaitingForDriver}) => {
  return (
    <div>
        <h5 onClick={() => {
            setWaitingForDriver(false)
            
          }} className='text-center w-full absolute top-0 p-1 '><i className="text-2xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
           <h3 className='text-xl font-semibold mb-5 '>Waiting for Driver</h3>
           <div className='flex items-center justify-between' >
           <img className='h-20 ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
            <div className='text-right'>
                <h2 className='text-lg font-medium -mb-1'>{ride?.captain?.fullName?.firstname + " " + ride?.captain?.fullName?.lastname }</h2>
                <h4 className='text-xl font-semibold'>{ride?.captain?.vehicle?.plate }</h4>
                <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
            </div>
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
                 <div className='flex gap-5 items-center p-2 -mb-4'>
                 <i className="ri-currency-line"></i>
                  <div>
                     <h4 className='text-lg font-medium'>₹{ride?.fare}</h4>
                     <p className='text-sm text-gray-600 -mt-1 '>Cash Cash</p>
                  </div>
                 </div>
            </div>
             
          </div>
    </div>
  )
}

export default WaitingForDriver
