import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [ActiveTab, setActiveTab] = useState("home")
  // const ActiveTab=useSelector(state=>state.Active_tab)
  const location=useLocation();
  const navigate=useNavigate();
  const handleNavigate=(tab)=>{
    // dispatch(ActiveTabFn(tab))
    console.log(location.pathname);
    navigate(`${tab}`)
  }
  useEffect(() => {
    setActiveTab(location.pathname.slice(location.pathname.lastIndexOf('/')+1,location.pathname.length))
  }, [location.pathname])
  return (
    <div className='flex justify-between items-center min-h-[60px] w-full px-10 sticky top-4 z-10 bg-white rounded-full shadow-[15px_15px_20px_-5px_rgba(220,234,245,1)] max-[767px]:justify-center max-[767px]:flex-col max-[767px]:py-2'>
      <div className='flex items-center gap-x-2 '>
        <p className='text-2xl font-medium'>Fitness Pro</p>
      </div>
      <div className='flex items-center gap-x-4 '>
        <div className={`px-3 py-1 rounded-full cursor-pointer ${ActiveTab==="home" ? "bg-[#0446F3] text-white" : "text-gray-800" }`} onClick={()=>{handleNavigate("home")}}>
          <p className='text-xl'>Home</p>
        </div>
        <div className={`px-3 py-1 rounded-full cursor-pointer ${ActiveTab==="currentPlan" ? "bg-[#0446F3] text-white" : "text-gray-800" }`} onClick={()=>{handleNavigate("currentPlan")}}>
          <p className='text-xl'>Current Plan</p>
        </div>
        <div className={`px-3 py-1 rounded-full cursor-pointer ${ActiveTab==="planner" ? "bg-[#0446F3] text-white" : "text-gray-800" }`} onClick={()=>{handleNavigate("planner")}}>
          <p className='text-xl'>Planner</p>
        </div>
        <div className={`px-3 py-1 rounded-full cursor-pointer ${ActiveTab==="profile" ? "bg-[#0446F3] text-white" : "text-gray-800" }`} onClick={()=>{handleNavigate("profile")}}>
          <p className='text-xl'>Profile</p>
        </div>
      </div>
    </div>
  )
}
