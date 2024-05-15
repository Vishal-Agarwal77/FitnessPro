import axios from 'axios'
import React, { useEffect, useState } from 'react'
import WorkoutCard from './WorkoutCard';
import dotenv from "dotenv"

dotenv.config({
  path: '../../../.env'
})

export default function Planner() {
  const [Data, setData] = useState();
  const getWorkout = async () => {
    const response = await axios.get(`${process.env.BACKEND_DOMAIN}/api/v1/getWorkouts`)
    if (response.status === 200) {
      // console.log(response)
      setData(response.data)
    }
  }
  useEffect(() => {
    getWorkout();
  }, [])

  return (
    <div className='flex flex-col w-[98.7vw]'>
      <div className='h-[10vh] items-center w-full flex gap-x-10 px-10'>
        <div className='flex items-center bg-white flex-1 rounded-full shadow-[15px_15px_20px_-5px_rgba(220,234,245,1)]'>
          <input type='text' placeholder='Search...' className='w-full h-9 outline-[#0548F0] px-2 rounded-s-full font-normal' />
          <i className="fa-solid fa-magnifying-glass px-6 py-2.5 rounded-e-full bg-[#0446F3] text-white cursor-pointer"></i>
        </div>
        <p className='flex-none px-6 py-1 rounded-full bg-[#0446F3] text-white text-lg cursor-pointer shadow-[15px_15px_20px_-5px_rgba(220,234,245,1)]'>Filter</p>
      </div>
      <div className='flex px-6 py-6 justify-between gap-x-4 flex-wrap gap-y-5'>
        {Data &&
          Data.map((item) => {
            return <WorkoutCard item={item} key={item.Name} />
          })
        }
      </div>
    </div>
  )
}
