import React from 'react'

const CaptainDetails = () => {
    return (
        <>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-center gap-4 '>
                    <img className='w-12 rounded-full' src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947" alt="" />
                    <h4 className='text-lg font-medium '>Harsh Patel</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold '>₹295.20</h4>
                    <p className='text-sm text-gray-600 '>Earned</p>
                </div>
            </div>
            <div className='flex justify-between bg-gray-100 items-center  mt-8 p-4 rounded-xl'>
                <div className='text-center ' >
                    <i className="text-2xl font-thin ri-time-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center ' >
                    <i className="text-2xl font-thin ri-speed-up-fill"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600' >Hours Online</p>
                </div>
                <div className='text-center '>
                    <i className="text-2xl font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
            </div>
        </>
    )
}

export default CaptainDetails
