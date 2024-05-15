import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import dotenv from 'dotenv'

// dotenv.config({
//   path: '../../../.env'
// })


export default function Login() {
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [Type, setType] = useState("password");
  const showPassword = () => {
    if (Type === "password") {
      setType("text")
    }
    else {
      setType("password")
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // let data = {...FormData};
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/login`, FormData, {
      withCredentials: true
    })
    console.log(response);
    if (response.status === 200) {
      // console.log("LoggedIn  Succesfully")'
      console.log(FormData);
      Cookies.set('AccessToken', response?.data?.data?.accessToken)
      Cookies.set('RefreshToken', response?.data?.data?.refreshToken)
      navigate('/User/home');
      // console.log("Access Token : "+response?.data?.data?.accessToken)
      // console.log("Refresh Token : "+response?.data?.data?.refreshToken)
    }
  }
  return (
    <div className='flex flex-col gap-y-6 px-4'>
      <form className='flex flex-col gap-y-6' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-y-2'>
          <label htmlFor='email' className='text-lg text-gray-800'>Email</label>
          <input type='text' name='email' className='px-2 py-[2px] border-[1px] border-gray-400 rounded-md text-lg test-gray-800' value={FormData.email} onChange={(e) => { setFormData({ ...FormData, email: e.target.value }) }} />
        </div>
        <div className='flex flex-col gap-y-2'>
          <label htmlFor='password' className='text-lg text-gray-800'>Password</label>
          <div className='px-2 py-[2px] border-[1px] border-gray-400 rounded-md text-lg test-gray-800 flex justify-between items-center'>
            <input type={Type} name='password' className='w-[90%] outline-0' value={FormData.password} onChange={(e) => { setFormData({ ...FormData, password: e.target.value }) }} />
            <div onClick={showPassword} className='cursor-pointer'>
              {Type === "password"
                ? <i className="fa-regular fa-eye-slash"></i>
                : <i className="fa-regular fa-eye"></i>
              }
            </div>
          </div>
        </div>
        <button type='submit' className='bg-[#0446F3] w-fit mx-auto px-4 py-1 text-lg text-white rounded-md mt-12'>Login</button>
      </form>
    </div>
  )
}
