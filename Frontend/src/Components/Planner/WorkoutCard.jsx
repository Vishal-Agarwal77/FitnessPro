import axios from 'axios';
import React, { useState } from 'react'
import Cookies from 'js-cookie';
import dotenv from "dotenv"

// dotenv.config({
//   path: '../../../.env'
// })

export default function WorkoutCard({ item }) {
  const [Count, setCount] = useState(3);
  const [Reps, setReps] = useState(3);
  const [Status, setStatus] = useState("ADD");
  const handleCount = (type, action) => {
    if (type === "Sets") {
      if (action === "-") {
        setCount(Count - 1)
      }
      else {
        setCount(Count + 1)
      }
    }
    else {
      if (action === "-") {
        setReps(Reps - 1)
      }
      else {
        setReps(Reps + 1)
      }
    }
  }
  const handleAdd = async () => {
    const token=Cookies.get('AccessToken')
    let Data = {
      accessToken:token,
      plan: {
        Name: item.Name,
        Reps: Reps,
        Sets: Count,
        image_url: item.image_url
      },
      action: Status
    }
    // console.log(Data)
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/create`, Data, {
      withCredentials: true
    })
    if (response.status === 201) {
      // console.log("Operation Successfully")
      // console.log(response);
    }
    if (Status === "ADD") {
      setStatus("REMOVE")
    }
    else {
      setStatus("ADD")
    }
  }
  return (
    <div className='w-[300px] rounded-xl flex flex-col items-center py-3 bg-white shadow-[15px_15px_20px_-5px_rgba(220,234,245,1)]'>
      <div className='h-3/5 w-full'>
        <img src={item.image_url} className='h-[100%] m-auto' />
      </div>
      <div className='min-h-2/5 w-fit flex flex-col gap-y-3 items-center'>
        <p className='text-2xl font-semibold'>{item.Name}</p>
        <div className='flex flex-col items-center gap-y-1 text-lg font-medium'>
          <p className=''>Sets</p>
          <div className=' rounded-full flex items-center'>
            <div className='px-2 bg-[#9194FA] cursor-pointer h-full rounded-full flex items-center justify-center bg-[#dee5fc] text-[#0446F3]' onClick={() => { handleCount("Sets", "-") }}>
              <i class="fa-solid fa-minus"></i>
            </div>
            <p className=' px-4 bg-white'>{Count}</p>
            <div className='px-2 bg-[#9194FA] cursor-pointer h-full rounded-full flex items-center justify-center bg-[#dee5fc] text-[#0446F3]' onClick={() => { handleCount("Sets", "+") }}>
              <i class="fa-solid fa-plus"></i>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center gap-y-1 text-lg font-medium'>
          <p className=''>Reps</p>
          <div className=' rounded-full flex items-center'>
            <div className='px-2 text-[#0446F3] bg-[#dee5fc] cursor-pointer h-full rounded-full flex items-center justify-center' onClick={() => { handleCount("Reps", "-") }}>
              <i class="fa-solid fa-minus"></i>
            </div>
            <p className='px-4 bg-white'>{Reps}</p>
            <div className='px-2 text-[#0446F3] bg-[#dee5fc] cursor-pointer h-full rounded-full flex items-center justify-center' onClick={() => { handleCount("Reps", "+") }}>
              <i class="fa-solid fa-plus"></i>
            </div>
          </div>
        </div>
        <p className={`w-[100px] text-lg font-semibold bg-[#0446F3] text-white px-4 py-1 rounded-full cursor-pointer mt-3 flex items-center justify-center ${Status === "ADD" ? "" : "bg-[#e8574d]"}`} onClick={handleAdd}>{Status}</p>
      </div>
    </div>
  )
}
