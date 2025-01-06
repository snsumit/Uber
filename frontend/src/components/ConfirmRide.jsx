import React from 'react'

const ConfirmRide = ({setConfirmRidePanel,setVehicleFound}) => {
  return (
    <div>
         <h5 onClick={() => {
            setConfirmRidePanel(false)
            
          }} className='text-center w-full absolute top-0 p-1 '><i className="text-2xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
          <h3 className='text-xl font-semibold mb-5 '>Confirm your Ride</h3>
          <div className='flex gap-2 justify-between items-center flex-col'>
            <img className='h-32' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
            <div className='w-full mt-2 '>
                 <div className='flex gap-5 items-center p-2 border-b-2'>
                  <i class="text-lg ri-map-pin-fill"></i>
                  <div>
                     <h4 className='text-lg font-medium'>562/11-A</h4>
                     <p className='text-sm text-gray-600 -mt-1'>Kankariya Talab, Bhopal</p>
                  </div>
                 </div>
                 <div className='flex gap-5 items-center p-2 border-b-2'>
                 <i className="text-lg ri-map-pin-fill"></i>
                  <div>
                     <h4 className='text-lg font-medium'>562/11-A</h4>
                     <p className='text-sm text-gray-600 -mt-1'>Kankariya Talab, Bhopal</p>
                  </div>
                 </div>
                 <div className='flex gap-5 items-center p-2'>
                 <i class="ri-currency-line"></i>
                  <div>
                     <h4 className='text-lg font-medium'>₹193.20</h4>
                     <p className='text-sm text-gray-600 -mt-1'>Cash Cash</p>
                  </div>
                 </div>
            </div>
              <button onClick={()=>{
                setVehicleFound(true)
                setConfirmRidePanel(false)
              }} className='bg-green-600 w-full -mb-4 text-white font-semibold p-2 rounded-lg' >Confirm</button>
          </div>

    </div>
  )
}

export default ConfirmRide
