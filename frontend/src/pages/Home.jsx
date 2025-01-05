import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'

const Home = () => {
  const [pickup, setPickUp] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef()
  const panelCloseRef = useRef()
  const vehiclePanelRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        display: 'block',
        padding: '24'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      })
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        display: 'none',
        padding: '0'

      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      })
    }

  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanelOpen])

  const handleFormSubmit = (e) => {
    e.preventDefault()

  }

  return (
    <div className='h-screen relative' >
      <img className='w-16 absolute  left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-full'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='w-full  absolute flex flex-col h-screen top-0 justify-end'>
        <div className='bg-white h-[30%] relative p-5'>
          <h4
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false)
            }}
            className='absolute opacity-0 right-4 top-4   text-xl ' >
            <i className="ri-arrow-down-wide-fill"></i>
          </h4>
          <h4 className='text-2xl font-semibold mt-2 mb-2'>Find a trip</h4>
          <form onClick={handleFormSubmit}>
            <div className="line absolute h-20 left-10 w-1 top-[38%] bg-gray-600 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              className='bg-[#eeeeee] w-full rounded-lg border mb-2 text-lg py-2 px-20  placeholder:text-base'
              type="text"
              value={pickup}
              placeholder='Add a pick-up location'
              onChange={(e) => {
                setPickUp(e.target.value)
              }}
            />
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              className='bg-[#eeeeee] w-full rounded-lg border mb-2 text-lg py-2 px-20 placeholder:text-base'
              type="text"
              value={destination}
              placeholder='Enter your destination'
              onChange={(e) => {
                setDestination(e.target.value)
              }}
            />
          </form>
        </div>
        <div ref={panelRef} className='bg-white none h-0'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
        <div ref={vehiclePanelRef} className='fixed bg-white z-10 w-full px-2 py-10 translate-y-full'>
          <h4 onClick={() => {
            setVehiclePanelOpen(false)
          }} className='text-center w-full absolute top-0 p-1 '><i className="text-2xl text-gray-200 ri-arrow-down-wide-fill"></i></h4>
          <h3 className='text-xl font-semibold mb-5 '>Choose a Vehicle</h3>
          <div className='flex p-2 border-2 mb-2 active:border-black rounded-xl  justify-between items-center  w-full'>
            <img className='h-16 ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
            <div className=' w-1/2'>
              <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i>4</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>

            </div>
            <h2 className='text-lg  font-semibold'>₹193.20</h2>
          </div>
          <div className='flex p-2  border-2 mb-2 active:border-black rounded-xl  justify-between items-center  w-full'>
            <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
            <div className='w-1/2 -ml-2'>
              <h4 className='font-medium text-base'>Moto<span><i className="ri-user-fill"></i>1</span></h4>
              <h5 className='font-medium text-sm'>4 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>

            </div>
            <h2 className='text-lg  font-semibold'>₹65</h2>
          </div>
          <div className='flex p-2 border-2 mb-2 active:border-black rounded-xl  justify-between items-center  w-full'>
            <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
            <div className='w-1/2 ml-2'>
              <h4 className='font-medium text-base'>UberAuto<span><i className="ri-user-fill"></i>3</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>

            </div>
            <h2 className='text-lg  font-semibold'>₹118.21</h2>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
Home