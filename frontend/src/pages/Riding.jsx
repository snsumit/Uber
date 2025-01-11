import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import {SocketContext} from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'


const Riding = () => {

    
    const {socket} =useContext(SocketContext)
    const navigate = useNavigate()

    const location = useLocation()
    const ride = location.state?.ride 


    useEffect(()=>{
       socket.on("ride-ended",()=>{
              navigate('/home')
       }) 
    },[socket , navigate])

    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed h-10 w-10 top-2 right-2 bg-white items-center flex justify-center rounded-full'>
            <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2 overflow-hidden z-0 relative'>
                <LiveTracking ride={ride} />
            </div>
            <div className='h-1/2 p-4 z-20'>

                <div className='flex items-center justify-between' >
                    <img className='h-20 ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium -mb-1'>{ride?.captain?.fullName?.firstname}</h2>
                        <h4 className='text-xl font-semibold'>{ride?.captain?.vehicle?.plate}</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    </div>
                </div>

                <div className='flex gap-2 justify-between items-center flex-col'>

                    <div className='w-full mt-5 '>
                       
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
                <button className='mt-10 bg-green-600 p-2 w-full rounded-xl font-semibold text-white'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding
