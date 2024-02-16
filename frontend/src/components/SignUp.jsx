import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../utils/userFunctions';

const SignUp = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
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

  const handleSignUp = async () => {
    if (await signUp(userDetails)) {
      navigate('/')
    } else {
      navigate('/signup')
    }

    setUserDetails({
      firstName: '',
      lastName: '',
      userName: '',
      password: ''
    })
  }

  return (
    <div className='bg-gray-400 w-full h-screen flex items-center justify-center'>
      <div className=' rounded-lg bg-white flex flex-col justify-center items-center max-w-fit px-6 p-1'>
        <h1 className='mt-4 font-extrabold text-[25px] '>Sign Up</h1>
        <p className='text-gray-500 mb-2 text-center'> Enter your information to create an<br /> account </p>
        <div className='flex flex-col my-2'>
          <label className='font-semibold'>First Name</label>
          <input name='firstName' className='border-2 border-gray-300 rounded-md w-[300px] p-1' type='text' placeholder='Enter your First Name' required value={userDetails.firstName} onChange={changeDetails} />
        </div>
        <div className='flex flex-col my-2'>
          <label className='font-semibold'>Last Name</label>
          <input name='lastName' className='border-2 border-gray-300 rounded-md w-[300px] p-1' type='text' placeholder='Enter your Last Name' required value={userDetails.lastName} onChange={changeDetails} />
        </div>
        <div className='flex flex-col my-2'>
          <label className='font-semibold'>Email</label>
          <input name='userName' className='border-2 border-gray-300 rounded-md w-[300px] p-1' type='email' placeholder='Enter your Email' required value={userDetails.userName} onChange={changeDetails} />
        </div>
        <div className='flex flex-col my-2'>
          <label className='font-semibold'>Password</label>
          <input name='password' className='border-2 border-gray-300 rounded-md w-[300px] p-1' type='password' placeholder='Enter your Password' required value={userDetails.password} onChange={changeDetails} />
        </div>
        <button type='button' className='w-full bg-black text-white rounded-md p-2 my-2' onClick={handleSignUp}>SignUp</button>
        <p className='text-gray-500 mb-3'>Already have an account? <a className='text-black' href='/signin'>LogIn</a></p>
      </div>
    </div>
  )
}

export default SignUp
