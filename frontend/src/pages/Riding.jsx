import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed h-10 w-10 top-2 right-2 bg-white items-center flex justify-center rounded-full'>
            <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2 '>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-1/2 p-4'>

                <div className='flex items-center justify-between' >
                    <img className='h-20 ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium -mb-1'>Sarthak</h2>
                        <h4 className='text-xl font-semibold'>MP04 AB 1234</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    </div>
                </div>

                <div className='flex gap-2 justify-between items-center flex-col'>

                    <div className='w-full mt-5 '>
                       
                        <div className='flex gap-5 items-center p-2 border-b-2'>
                            <i className="text-lg ri-map-pin-fill"></i>
                            <div>
                                <h4 className='text-lg font-medium'>562/11-A</h4>
                                <p className='text-sm text-gray-600 -mt-1'>Kankariya Talab, Bhopal</p>
                            </div>
                        </div>
                        <div className='flex gap-5 items-center p-2 -mb-4'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h4 className='text-lg font-medium'>₹193.20</h4>
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
