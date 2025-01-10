import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainHome = () => {
  const [ridePopupPanel,setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel,setConfirmRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)
  const {socket} = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext) 
  const [ride,setRide] = useState(null)

  useEffect(()=>{
    socket.emit('join',{userType:'captain',userId:captain?._id})
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          socket.emit('update-location-captain', {
             userId: captain._id,
             location:{
              ltd:latitude,
              lng: longitude 
             }
             
            }
          );
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    
  })

  socket.on('new-ride',(data)=>{
    setRide(data)
    setRidePopupPanel(true)
  })

// update the captain locaion in every 10 seconds
  const confirmRide = async () => {
     const response =  await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
        rideId:ride?._id
     },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
     } )
     console.log(response.data)

  }

  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])

  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel])
  return (
    <div className='h-screen'>
      <div className='fixed p-3 top-0 flex w-screen items-center justify-between '>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/home' className=' h-10 w-10  bg-white items-center flex justify-center rounded-full'>
          <i className="text-lg ri-logout-circle-r-line"></i>
        </Link>
      </div>

      <div className='h-3/5 '>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className='fixed bg-white bottom-0 z-10 w-full px-2 py-10 translate-y-full '>
        <RidePopUp confirmRide={confirmRide} ride={ride} setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}  />
      </div>
      <div ref={confirmRidePopupPanelRef} className='fixed bg-white h-screen bottom-0 z-10 w-full px-2 py-10 translate-y-full '>
        <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}  />
      </div>
    </div>
  )
}

export default CaptainHome
