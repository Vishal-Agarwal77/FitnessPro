import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function UserLayout() {
    return (
        <div className='flex flex-col items-start bg-[#F3F8FC] w-[100%] min-h-screen font-roboto'>
            <Navbar />
            <div className='mt-10 w-[100%]'>
                <Outlet />
            </div>
        </div>
    )
}
