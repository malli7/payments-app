import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { getAllUsers, getUserBalances, getUserDetails } from '../../utils/userFunctions';

const Dashboard = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [balance, setBalance] = useState(5000)
    const [allUsers, setAllUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = allUsers.filter(user => user.userName.toLowerCase().includes(searchQuery.toLowerCase()));

    useEffect(() => {
        if (!token) {
            navigate("/signin")
        }
        else {
            getUserDetail()
            getUserBalance()
            getAllUser()
        }
    }, [])

    const getUserDetail = async () => {
        setCurrentUser(await getUserDetails(token))
    }

    const getAllUser = async () => {
        setAllUsers(await getAllUsers(token))
    }

    const getUserBalance = async () => {
        setBalance(await getUserBalances(token))
    }

    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate('/signin')
    }


    return (
        <>
            <nav className='flex flex-row items-center justify-between border-b-2 border-gray-100 p-2'>
                <h1 className='font-bold text-[20px] mx-4 my-1'>Payments App</h1>
                <div className='flex flex-row items-center'>
                    <button className='bg-black text-white rounded-md p-1 m-2' onClick={handleLogOut}>logout</button>
                    <p className='font-semibold'>Hello {currentUser.userName ? currentUser.userName : "user"}</p>
                    <img className='rounded-full w-[40px] mx-3' src='https://randomuser.me/api/portraits/men/36.jpg' />
                </div>
            </nav>
            <div>
                <p className='font-semibold text-[20px] mx-4 my-1 mt-3'> Your Balance <b>{balance}</b></p>
            </div>
            <div>
                <h1 className='font-bold text-[20px] mx-4 my-1'>
                    Users
                </h1>
                <div className='w-full px-4 my-2'>
                    <input
                        className='w-full border-2 rounded-md border-gray-300 p-2'
                        type='text'
                        placeholder='Search Users'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {
                    filteredUsers.map((user) => (
                        <div key={user._id} className='flex w-full flex-row justify-between px-3 py-1'>
                            <div className='flex flex-row items-center'>
                                <img className='rounded-full w-[40px] mx-3' src={'https://randomuser.me/api/portraits/men/36.jpg'} alt={`${user.userName} profile`} />
                                <h1>{user.userName}</h1>
                            </div>
                            <Link to={`/transfer/${user.userName}/${user._id}`}>
                                <button type='button' className='bg-black text-white rounded-md p-2 my-2'>Send Money</button>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Dashboard
