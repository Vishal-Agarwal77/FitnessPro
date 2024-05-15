import React, { useEffect, useState } from 'react'
import PastRecord from './PastRecord/PastRecord';
import axios from 'axios';
import Cookies from 'js-cookie'
import dotenv from "dotenv"

dotenv.config({
    path: '../../../.env'
})
  

export default function History() {
    const [Data, setData] = useState();
    const getData = async () => {
        try {
            let accessToken=Cookies.get("AccessToken")
            const response = await axios.post(`${process.env.BACKEND_DOMAIN}/api/v1/PastRecord`, {accessToken}, {
                withCredentials: true
            })
            console.log(response);
            if (response.status === 200) {
                setData(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='flex items-center justify-between gap-x-4 gap-y-6 mx-6 text-gray-900 flex-wrap mt-6 max-[1324px]:justify-center'>
            {Data &&
                <>
                    <PastRecord heading='Calories Burned' label={Data.Date} data={Data.Calories} />
                    <PastRecord heading='Time Spent' label={Data.Date} data={Data.Minutes} />
                    <PastRecord heading='Workout' label={Data.Date} data={Data.Workout_Count} />
                </>
            }
        </div>
    )
}
