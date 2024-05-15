import React, { useEffect, useState } from 'react'
import Total from './Statistics/Total'
import axios from 'axios'
import Cookies from 'js-cookie'
import dotenv from "dotenv"

dotenv.config({
    path: '../../../.env'
})

export default function Statistics() {
    const [Data, setData] = useState('')
    const getData = async () => {
        try {
            const accessToken=Cookies.get("AccessToken")
            const response = await axios.post(`${process.env.BACKEND_DOMAIN}/api/v1/getCurrentWorkout`, {accessToken}, {
                withCredentials: true
            })
            console.log(response);
            if (response.status === 200) {
                // console.log("Current Workout got successfully")
                let time = 0, burn = 0, count = 0
                if (response?.data?.data) {
                    for (let val of response?.data?.data) {
                        time += val.Time_taken;
                        burn += val.Time_taken * (val.Intensity * 3.5 * 45) / 200
                        if (val.Status) {
                            count++
                        }
                    }
                }
                setData({
                    Time_taken: time,
                    Calories_burn: burn,
                    Total_workout: count
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='flex flex-wrap items-center justify-between gap-x-6 gap-y-6 mx-6 py-4 rounded-xl bg-white text-gray-900 px-6 shadow-[15px_15px_20px_-5px_rgba(220,234,245,1)] max-[766px]:justify-center'>
            {/* {Data &&  */}
            <>
                <Total name='time' val={Data?.Time_taken ? Data.Time_taken : 0} />
                <Total name='calories' val={Data?.Calories_burn ? Data.Calories_burn : 0} />
                <Total name='total' val={Data?.Total_workout ? Data.Total_workout : 0} />
            </>
            {/* } */}
        </div>
    )
}
