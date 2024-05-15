import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dotenv from dotenv

dotenv.config({
    path: '../../../.env'
  })
  

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setformData] = useState({
        avatar: {},
        fullname: '',
        username: '',
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
        // let data = {...formData};
        let form = new FormData();
        for(let key in formData){
            // console.log(`${key} : ${formData[key]}`)
            form.append(key,formData[key])
        }
        console.log(form)
        const response = await axios.post(`${process.env.BACKEND_DOMAIN}/api/v1/register`, form)
        console.log(response);
        if (response.status === 201) {
            navigate("verify");
            console.log("Submitted Succesfully")
            console.log(formData);
            setformData({
                avatar: '',
                fullname: '',
                username: '',
                email: '',
                password: ''
            })
        }
    }
    return (
        <div className='flex flex-col gap-y-6 px-4'>
            <form className='flex flex-col gap-y-6' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor='avatar' className='text-lg text-gray-800'>Profile Picture</label>
                    <input type='file' name='avatar' className='text-lg test-gray-800' onChange={(e) => { setformData({ ...formData, avatar: e.target.files[0] }) }} />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor='fullname' className='text-lg text-gray-800'>Full Name</label>
                    <input type='text' avatar='fullname' className='px-2 py-[2px] border-[1px] border-gray-400 rounded-md text-lg test-gray-800' value={formData.fullname} onChange={(e) => { setformData({ ...formData, fullname: e.target.value }) }} />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor='username' className='text-lg text-gray-800'>Username</label>
                    <input type='text' name='username' className='px-2 py-[2px] border-[1px] border-gray-400 rounded-md text-lg test-gray-800' value={formData.username} onChange={(e) => { setformData({ ...formData, username: e.target.value }) }} />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor='email' className='text-lg text-gray-800'>Email</label>
                    <input type='text' name='email' className='px-2 py-[2px] border-[1px] border-gray-400 rounded-md text-lg test-gray-800' value={formData.email} onChange={(e) => { setformData({ ...formData, email: e.target.value }) }} />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor='password' className='text-lg text-gray-800'>Password</label>
                    <div className='px-2 py-[2px] border-[1px] border-gray-400 rounded-md text-lg test-gray-800 flex justify-between items-center'>
                        <input type={Type} name='password' className='w-[90%] outline-0' value={formData.password} onChange={(e) => { setformData({ ...formData, password: e.target.value }) }} />
                        <div onClick={showPassword} className='cursor-pointer'>
                            {Type === "password"
                                ? <i className="fa-regular fa-eye-slash"></i>
                                : <i className="fa-regular fa-eye"></i>
                            }
                        </div>
                    </div>
                </div>
                <button type='submit' className='bg-[#0446F3] w-fit mx-auto px-4 py-1 text-lg text-white rounded-md mt-12'>Sign Up</button>
            </form>
        </div>
    )
}
