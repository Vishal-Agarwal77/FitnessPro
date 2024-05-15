import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import dotenv from 'dotenv'

dotenv.config({
    path: '../../../../.env'
  })
  

export default function Card({ item }) {
    const [Star, setStar] = useState();
    const [status, setstatus] = useState(item.Status)
    const [Timetaken, setTimetaken] = useState("");
    const handleStatus = async () => {
        if (!status) {
            try {
                let data = {
                    accessToken:Cookies.get("AccessToken"),
                    plan: {
                        ...item,
                        Intensity: Star,
                        Time_taken: Timetaken
                    }
                }
                const response = await axios.post(`${process.env.BACKEND_DOMAIN}/api/v1/doneWorkout`, data, {
                    withCredentials: true
                })
                if (response.status === 200) {
                    // console.log("Changed Successfully")
                    // console.log(response);
                }
            } catch (error) {
                console.log(error)
            }
            setstatus(!status)
        }
    }
    const handleTime = (event) => {
        setTimetaken(event.target.value)
    }
    const handleIntensity = (val) => {
        if (!item.Status) {
            setStar(val)
        }
    }
    return (
        <div className='w-[300px] rounded-xl bg-[#EEEEFB] flex flex-col items-center py-3 bg-white shadow-[15px_15px_20px_-5px_rgba(220,234,245,1)]'>
            <div className='h-3/5 w-full'>
                <img src={item.image_url} className='h-[100%] m-auto' />
            </div>
            <div className='min-h-2/5 w-fit flex flex-col gap-y-3 items-center'>
                <p className='text-2xl font-semibold'>{item.Name}</p>
                <div className='flex w-[100px] justify-evenly items-center gap-y-1 text-lg font-medium rounded-full bg-[#ebf0fa] text-[#0446F3]'>
                    <p className=''>Sets</p>
                    <div className='px-2 flex items-center'>
                        <p className=''>{item.Sets}</p>
                    </div>
                </div>
                <div className='flex w-[100px] justify-evenly items-center gap-y-1 text-lg font-medium  rounded-full bg-[#dce6fc] text-[#0446F3]'>
                    <p className=''>Reps</p>
                    <div className='px-2 flex items-center'>
                        <p className=''>{item.Reps}</p>
                    </div>
                </div>
                <div className='my-4 flex flex-col gap-y-6 items-center text-lg font-medium'>
                    <p>Intensity</p>
                    <div className='flex gap-x-1'>
                        <i class={`fa-regular fa-star fa-xl ${item.Status ? "" : "cursor-pointer"} ${Star >= 2 || item.Intensity >= 2 ? "fa-solid text-[#FFD43B]" : "fa-regular"}`} onClick={() => { handleIntensity(2) }}></i>
                        <i class={`fa-regular fa-star fa-xl ${item.Status ? "" : "cursor-pointer"} ${Star >= 3 || item.Intensity >= 3 ? "fa-solid text-[#FFD43B]" : "fa-regular"}`} onClick={() => { handleIntensity(3) }}></i>
                        <i class={`fa-regular fa-star fa-xl ${item.Status ? "" : "cursor-pointer"} ${Star >= 4 || item.Intensity >= 4 ? "fa-solid text-[#FFD43B]" : "fa-regular"}`} onClick={() => { handleIntensity(4) }}></i>
                        <i class={`fa-regular fa-star fa-xl ${item.Status ? "" : "cursor-pointer"} ${Star >= 5 || item.Intensity >= 5 ? "fa-solid text-[#FFD43B]" : "fa-regular"}`} onClick={() => { handleIntensity(5) }}></i>
                        <i class={`fa-regular fa-star fa-xl ${item.Status ? "" : "cursor-pointer"} ${Star >= 6 || item.Intensity >= 6 ? "fa-solid text-[#FFD43B]" : "fa-regular"}`} onClick={() => { handleIntensity(6) }}></i>
                    </div>
                </div>
                <div className='flex flex-col gap-y-2 t items-center ext-lg font-medium'>
                    <label htmlFor={`time${item.Name}`}>Time Taken(in minutes)</label>
                    <input type='number' name='time' id={`time${item.Name}`} value={item.Status ? item.Time_taken : Timetaken} onChange={handleTime} className='border-2 border-black rounded-lg px-2' disabled={item.Status} />
                </div>
                <p className={`text-lg font-semibold text-white w-[100px] bg-[#0446F3] px-4 py-1 rounded-full mt-3 flex items-center justify-center ${status ? "bg-[#16A34C]" : "cursor-pointer"}`} onClick={handleStatus}>{status ? "Congrats" : "DONE"}</p>
            </div>
        </div>
    )
}
