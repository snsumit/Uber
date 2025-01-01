import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const Captainlogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})
    const handleFormSubmit = (e) => {
        e.preventDefault()
        setCaptainData({
            email,
            password,
        })
        console.log(captainData)

        setEmail('')
        setPassword('')
    }

    return (
        <div className='p-8 flex flex-col h-screen justify-between' >
            <div>
                <img className='w-20 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <form autoComplete='false' onSubmit={handleFormSubmit}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        required
                        type="email"
                        value={email}
                        placeholder='email@example.com'
                        className='border w-full bg-[#eeeeee] py-2 px-4 rounded text-lg mb-7 placeholder:text-base '
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <h3 className='text-lg mb-2 font-medium'>Enter Password</h3>
                    <input
                        required
                        value={password}
                        type="password"
                        placeholder='password'
                        className='border w-full bg-[#eeeeee] py-2 px-4 rounded text-lg mb-7 placeholder:text-base '
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <button className='w-full bg-black py-3 mb-3 px-4 text-white font-semibold rounded'>Login</button>
                </form>
                <p className='text-base text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as Captain</Link></p>
            </div>
            <div>
                <Link to='/login' className='bg-orange-600 flex justify-center items-center w-full py-3 px-4 text-white font-semibold rounded'>Sign in as User</Link>
            </div>

        </div>
    )
}

export default Captainlogin
