import React from 'react'
import { useRef} from 'react'
import { useState } from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'

const Home = () => {
  const [pickup,setPickUp]=useState('')
  const [destination,setDestination] = useState('')
  const [panelOpen,setPanelOpen] = useState(false) 
  const panelRef = useRef()
  const panelCloseRef = useRef()
  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:"70%",
        display:'block',
        padding:'24'
      })
      gsap.to(panelCloseRef.current,{
        opacity:1,
      })
    }else{
      gsap.to(panelRef.current,{
        height:"0%",
        display:'none',
        padding:'0'
       
      })
      gsap.to(panelCloseRef.current,{
        opacity:0,
      })
    }
  
  },[panelOpen])
    
  const handleFormSubmit = (e)=>{
       e.preventDefault()

  }

  return (
    <div className='h-screen relative' >
        <img className='w-16 absolute  left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='h-screen w-full'>
               <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className= 'w-full  absolute flex flex-col h-screen top-0 justify-end'>
              <div className='bg-white h-[30%] relative p-5'>
              <h4
               ref={panelCloseRef}
              onClick={()=>{
                setPanelOpen(false)
              }} 
              className='absolute opacity-0 right-4 top-4   text-xl ' >
              <i className="ri-arrow-down-wide-fill"></i>
              </h4>
              <h4 className='text-2xl font-semibold mt-2 mb-2'>Find a trip</h4>
              <form onClick={handleFormSubmit}>
                <div className="line absolute h-20 left-10 w-1 top-[38%] bg-gray-600 rounded-full"></div>
                 <input 
                 onClick={()=>{
                  setPanelOpen(true)
                 }}
                 className='bg-[#eeeeee] w-full rounded-lg border mb-2 text-lg py-2 px-20  placeholder:text-base' 
                 type="text" 
                 value={pickup}
                 placeholder='Add a pick-up location' 
                 onChange={(e)=>{
                   setPickUp(e.target.value)
                 }}
                 />
                 <input  
                 onClick={()=>{
                  setPanelOpen(true)
                 }}
                 className='bg-[#eeeeee] w-full rounded-lg border mb-2 text-lg py-2 px-20 placeholder:text-base' 
                 type="text" 
                 value={destination}
                 placeholder='Enter your destination' 
                 onChange={(e)=>{
                   setDestination(e.target.value)
                 }}
                 />
              </form>
              </div>
              <div ref={panelRef} className='bg-white none h-0'>
                      <LocationSearchPanel />
              </div>
              
             
        </div>
    </div>
  )
}

export default Home
Home