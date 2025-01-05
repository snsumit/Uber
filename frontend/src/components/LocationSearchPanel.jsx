import React from 'react'

const LocationSearchPanel = ({setVehiclePanelOpen,setPanelOpen}) => {

  const location = [
      "1234 Elm Street Springfield,United States",
      "456 Ocean Drive, Monterey, United States",
      "789 Mountain Ridge Road, Denver, CO",
      "101 Green Valley Lane, Chicago, IL",
      "202 Central Avenue, San Francisco, CA"
  ]
  
  return (
    <div>
          {
            location.map((elem,index)=>{
            return <div  onClick={()=>{
               setVehiclePanelOpen(true)
               setPanelOpen(false)
            }} key={index} className='flex  gap-4 border-gray-50 border-2 p-2 active:border-black rounded-xl  my-2 justify-center items-center'>
                <h4 className=' h-8  w-12 rounded-full bg-gray-200'><i className="ri-map-pin-fill text-lg h-full flex items-center justify-center "></i></h4>
                <h4 className='font-medium'>{elem}</h4>
             </div>
    
            })
          }
         
         
    </div>
  )
}

export default LocationSearchPanel
