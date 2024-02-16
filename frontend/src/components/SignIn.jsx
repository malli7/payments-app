import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../utils/userFunctions';

const SignIn = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [userDetails, setUserDetails] = useState({
    userName: '',
    password: ''
  })

  useEffect(() => {
    if (token?.length > 0) {
      navigate("/")
    }
  }, [])

  const changeDetails = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value })
  }

  const handleSignIn = async () => {
    if (await signIn(userDetails)) {
      navigate("/")
    } else {
      navigate('/signin')
    }
    setUserDetails({
      userName: '',
      password: ''
    })
  }
  return (
    <div className='bg-gray-400 w-full h-screen flex items-center justify-center'>
      <div className=' rounded-lg bg-white flex flex-col justify-center items-center max-w-fit px-6 p-1'>
        <h1 className='mt-4 font-extrabold text-[25px] '>Sign In</h1>
        <p className='text-gray-500 mb-2 text-center'> Enter your credentials to access your<br /> account </p>
        <div className='flex flex-col my-2'>
          <label className='font-semibold'>Email</label>
          <input name='userName' className='border-2 border-gray-300 rounded-md w-[300px] p-1' type='email' placeholder='Enter your Email' required value={userDetails.userName} onChange={changeDetails} />
        </div>
        <div className='flex flex-col my-2'>
          <label className='font-semibold'>Password</label>
          <input name='password' className='border-2 border-gray-300 rounded-md w-[300px] p-1' type='password' placeholder='Enter your Password' required value={userDetails.password} onChange={changeDetails} />
        </div>
        <button type='button' className='w-full bg-black text-white rounded-md p-2 my-2' onClick={handleSignIn}>SignIn</button>
        <p className='text-gray-500 mb-3'>Don't have an account? <a className='text-black' href='/signup'>Signup</a></p>
      </div>
    </div>
  )
}

export default SignIn
