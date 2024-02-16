import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { sendMoney } from '../../utils/userFunctions';

const Transfer = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const { userId, userName } = useParams();
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    if (!token) {
      navigate("/signin")
    }
  }, [])

  const handleSendMoney = async () => {
    await sendMoney(token, amount, userId)
    navigate('/')
  }


  return (
    <div className='bg-gray-400 w-full h-screen flex items-center justify-center'>
      <div className=' rounded-lg bg-white flex flex-col justify-center items-center max-w-fit px-6 p-1'>
        <h1 className='mt-4 font-bold text-[30px] '>Send Money</h1>
        <div className='flex flex-col my-2 mt-10'>
          <div className='flex my-2'>
            <img className='rounded-full w-[40px] mx-3' src='https://randomuser.me/api/portraits/men/36.jpg' />
            <h1 className='font-semibold text-[25px]'> {userName ? userName : "Friend's Name"}</h1>
          </div>
          <label className='font-semibold'>Amount in Rs</label>
          <input className='border-2 border-gray-300 rounded-md w-[300px] p-1' type='number' placeholder='Enter Amount' required value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button disabled={amount > 0 ? false : true} type='button' className='w-full disabled:bg-red-500 bg-green-500 text-white rounded-md p-2 my-2' onClick={handleSendMoney}>Send Money</button>
      </div>
    </div>
  )
}

export default Transfer
