import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
        <div className='bg-red-400 bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] bg-no-repeat bg-cover bg-center pt-8 h-screen w-full flex flex-col justify-between '>  
             <img className='w-20 ml-8 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"   alt="" />
           <div className='bg-white pb-7 py-4 px-4 '>
                 <p className='font-bold text-3xl'>Get Started With Uber</p>
                 <Link to='/login' className='text-center font-semibold text-lg inline-block bg-black text-white rounded py-3 w-full mt-5  ' >Continue</Link>
           </div>

        </div>
    </div>
  )
}

export default Home
