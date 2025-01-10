import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { userDataContext } from '../context/UserContext';


const Home = () => {
  const [pickup, setPickUp] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef();
  const panelCloseRef = useRef();
  const vehiclePanelRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const waitingForDriverRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [image, setImage] = useState('');
  const vehicleFoundRef = useRef(null);
  const [ride,setRide] = useState(null)
  const confirmRidePanelRef = useRef(null);
  const {socket} = useContext(SocketContext)

  const { user } = useContext(userDataContext)

  useEffect(()=>{

     socket.emit('join',{userType:'user',userId:user._id})
  },[])

  socket.on('ride-confirmed',(data)=>{
    console.log(data) 
    setRide(data)
    setVehicleFound(false)
    setWaitingForDriver(true)
  })


  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        display: 'block',
        padding: '24',
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        display: 'none',
        padding: '0',
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);
   
  useGSAP(function () {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [confirmRidePanel]);

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [vehicleFound]);

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [waitingForDriver]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };


  // const fetchSuggestions = async (query, type) => {
  //   if (!query.trim()) return; // Avoid unnecessary API calls for empty input
  
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
  //       params: { input: query },
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  
    
  //     const formattedSuggestions = response.data.map((item) => ({
  //       name: [
  //         item.houseNumber,
  //         item.street,
  //         item.city,
  //         item.state,
  //       ]
  //         .filter(Boolean) // Remove undefined/null values
  //         .join(', '), // Join the parts with a comma
  //       ...item,
  //     }));
  
  //     if (type === 'pickup') {
  //       setPickupSuggestions(formattedSuggestions);
  //     } else {
  //       setDestinationSuggestions(formattedSuggestions);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching suggestions:', error);
  //   }
  // };

  // Trigger fetchSuggestions on pickup and destination input changes
  // useEffect(() => {
  //   if (pickup) fetchSuggestions(pickup, 'pickup');
  //   else setPickupSuggestions([]); // Clear suggestions when input is cleared
  // }, [pickup,pickupSuggestions]);

  // useEffect(() => {
  //   if (destination) fetchSuggestions(destination, 'destination');
  //   else setDestinationSuggestions([]); // Clear suggestions when input is cleared
  // }, [destination]);

   const handlePickupChange = async (e) => { 
       setPickUp(e.target.value);
      try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            
          })
          const formattedSuggestions = response.data.map((item) => ({
                  name: [
                    item.houseNumber,
                    item.street,
                    item.city,
                    item.state,
                  ]
                    .filter(Boolean) // Remove undefined/null values
                    .join(', '), // Join the parts with a comma
                  ...item,
                }));
          
            setPickupSuggestions(formattedSuggestions);      
      } catch (error) {
         
      }
    }
   const handleDestinationChange = async (e) => { 
        setDestination(e.target.value);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
              params: { input: e.target.value },
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              
            })
            const formattedSuggestions = response.data.map((item) => ({
                    name: [
                      item.houseNumber,
                      item.street,
                      item.city,
                      item.state,
                    ]
                      .filter(Boolean) // Remove undefined/null values
                      .join(', '), // Join the parts with a comma
                    ...item,
                  }));
            
              setDestinationSuggestions(formattedSuggestions);      
        } catch (error) {
        }
    } 

    const findTrip = async ()=>{
       setPanelOpen(false)
       setVehiclePanelOpen(true)
      

       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
       })
      
       setFare(response.data)
      
    }

   const createRide = async () =>{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType,

      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response)
    }

  return (
    <div className="h-screen relative">
      <img className="w-16 absolute left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className="h-screen w-full">
        <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className="w-full absolute flex flex-col h-screen top-0 justify-end">
        <div className="bg-white h-[35%] relative p-5">
          <h4
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 right-4 top-4 text-xl"
          >
            <i className="ri-arrow-down-wide-fill"></i>
          </h4>
          <h4 className="text-2xl font-semibold mt-2 mb-2">Find a trip</h4>
          <form onClick={handleFormSubmit}>
            <div className='line absolute h-20 w-1 left-10 top-[38%] bg-gray-700 rounded-full '></div>
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              } }
              className="bg-[#eeeeee] w-full rounded-lg border mb-2 text-lg py-2 px-20 placeholder:text-base"
              type="text"
              value={pickup}
              placeholder="Add a pick-up location"
              onChange={handlePickupChange}
            />
            <input
              onClick={() => {
              setPanelOpen(true)
              setActiveField('destination')
            }}
              className="bg-[#eeeeee] w-full rounded-lg border mb-2 text-lg py-2 px-20 placeholder:text-base"
              type="text"
              value={destination}
              placeholder="Enter your destination"
              onChange={handleDestinationChange}
            />
            <button onClick={findTrip} className='bg-black p-2 mt-2 rounded-xl text-white font-semibold w-full'>Find Trip</button>
          </form>
        </div>
        <div ref={panelRef} className="bg-white none h-0">
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPickUp={setPickUp}
            setDestination={setDestination}
            setDestinationSuggestions={setDestinationSuggestions}
            setPickupSuggestions={setPickupSuggestions}
            type={activeField} // Pass the active field type to the LocationSearchPanel
          />
        </div>
        <div ref={vehiclePanelRef} className="fixed bg-white z-10 w-full px-2 py-10 translate-y-full">
          <VehiclePanel setImage={setImage} setVehicleType={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
        <div ref={confirmRidePanelRef} className='fixed bg-white z-10 w-full px-2 py-10 translate-y-full'>
          <ConfirmRide image={image} createRide={createRide} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
        </div>
        
        <div ref={vehicleFoundRef} className='fixed bg-white z-10 w-full px-2 py-10 translate-y-full'>
          <LookingForDriver vehicleType={vehicleType} image={image} pickup={pickup} destination={destination} fare={fare}  setVehicleFound={setVehicleFound} />
        </div>
        <div ref={waitingForDriverRef} className='fixed bg-white z-10 w-full px-2 py-10'>
          <WaitingForDriver ride={ride} setWaitingForDriver={setWaitingForDriver} />
        </div>
      </div>
    </div>
  );
};

export default Home;
