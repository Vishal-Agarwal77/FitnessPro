import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import dotenv from "dotenv"

dotenv.config({
    path: '../../../.env'
  })
  

export default function Profile() {
    const [User, setUser] = useState();
    const getData = async () => {
        try {
            const accessToken=Cookies.get("AccessToken")
            const response = await axios.post(`${process.env.BACKEND_DOMAIN}/api/v1/getUser`,{accessToken},{
                withCredentials: true
            });
            if (response.status === 200) {
                // console.log(response.data);
                setUser(response.data);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (User &&
        <div className='flex flex-col items-center px-4 justify-between mx-6 mb-8 py-8 rounded-xl bg-white gap-y-12 '>
            <div>
                <img src={User.data.avatar} alt={User.data.fullname} className='size-36 ' />
            </div>
            <form className='flex flex-col gap-y-6'>
                <div className='flex flex-col gap-y-2'>
                    <label className='text-lg text-gray-800'>Full Name</label>
                    <input type='text' avatar='fullname' className='px-2 py-[2px] border-[1px] border-gray-400 rounded-md text-lg test-gray-800 w-[300px] bg-white' value={User.data.fullname} disabled='true' />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label className='text-lg text-gray-800'>Username</label>
                    <input type='text' name='username' className='px-2 py-[2px] border-[1px] border-gray-400 rounded-md text-lg test-gray-800 bg-white' value={User.data.username} disabled='true' />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label className='text-lg text-gray-800'>Email</label>
                    <input type='text' name='email' className='px-2 py-[2px] border-[1px] border-gray-400 rounded-md text-lg test-gray-800 bg-white' value={User.data.email} disabled='true' />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label className='text-lg text-gray-800'>Password</label>
                    <div className='px-2 py-[2px] border-[1px] border-gray-400 rounded-md text-lg test-gray-800 flex justify-between items-center bg-white'>
                        <input type='password' name='password' className='w-[90%] outline-0 ' value={User.data.password} disabled='true' />
                    </div>
                </div>
            </form>
        </div>
    )
}
