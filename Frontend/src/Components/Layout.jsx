import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function Layout() {
    const [Curr, setCurr] = useState("login");
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/Login')
    }, [])
    useEffect(() => {
        let url = location.pathname.slice(location.pathname.lastIndexOf('/') + 1, location.pathname.length)
        if (url === 'Login') {
            setCurr("login")
        }
        else {
            setCurr("signup")
        }
    }, [location.pathname])
    return (
        <div className='max-w-screen min-h-screen bg-[#7B80C2] flex items-center justify-center py-[100px]'>
            <div className='w-[60%] bg-white rounded-xl px-10 py-10 flex flex-col gap-y-6'>
                <div className='flex items-center gap-x-4'>
                    <Link to="Login" className={`text-xl text-gray-800 pb-2 cursor-pointer border-b-2 ${Curr === "login" ? "border-[#0446F3]" : "border-white"}`} onClick={() => { setCurr("login") }}>Login</Link>
                    <Link to="Signup" className={`text-xl text-gray-800 pb-2 cursor-pointer border-b-2 ${Curr === "signup" ? "border-[#0446F3]" : "border-white"}`} onClick={() => { setCurr("signup") }}>SignUp</Link>
                </div>
                <div className=''>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
