import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import FinishRide from '../components/FinishRide'


const CaptainRiding = () => {
  const [finishRidePopupPanel,setFinishRidePopupPanel]= useState(false) 
  const finishRidePopupPanelRef = useRef(null) 

  useGSAP(function () {
    if (finishRidePopupPanel) {
      gsap.to(finishRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePopupPanel])

  return (
    <div className='h-screen'>
    <div className='fixed p-3 top-0 flex w-screen items-center justify-between '>
      <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <Link to='/captain-home' className=' h-10 w-10  bg-white items-center flex justify-center rounded-full'>
        <i className="text-lg ri-logout-circle-r-line"></i>
      </Link>
    </div>

    <div className='h-4/5 '>
      <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
    </div>
    <div className='h-1/5 p-8 flex justify-between items-center relative bg-yellow-400 'onClick={()=>{
        setFinishRidePopupPanel(true)
    }}>
    <h5  className='text-center left-44  absolute top-0 p-1 '><i className="text-2xl ri-arrow-up-wide-fill"></i></h5>
       <h4 className='text-xl font-medium'>4 km away</h4>
       <button className='bg-green-600 p-2 px-10 text-white font-semibold rounded-lg' >Complete Ride</button>
    </div>
    <div ref={finishRidePopupPanelRef} className='fixed bg-white  bottom-0 z-10 w-full px-2 py-10 translate-y-full '>
        <FinishRide setFinishRidePopupPanel={setFinishRidePopupPanel} />
     </div>
    
  </div>
  )
}

export default CaptainRiding
