import React, { useEffect, useState } from 'react'
import Card from './Card/Card';
import axios from 'axios';
import No_plan from '../../../../Assests/No_plan.png'
import Cookies from 'js-cookie';
import dotenv from 'dotenv'

dotenv.config({
  path: '../../../.env'
})


export default function Current() {
  const [Data, setData] = useState();
  const getdata = async () => {
    try {
      const accessToken=Cookies.get("AccessToken")
      const response = await axios.post(`${process.env.BACKEND_DOMAIN}/api/v1/getCurrentWorkout`, {accessToken}, {
        withCredentials: true
      })
      console.log(response);
      if (response.status === 200) {
        setData(response.data.data);
        // console.log("Current Workout got successfully")
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getdata()
  }, [])
  return (
    <div className='flex px-6 py-6 justify-between gap-x-4 flex-wrap gap-y-5 w-[98.7vw]'>
      {Data
        ?
        Data.map((item) => {
          return <Card item={item} key={item.Name} />
        })
        :
        <div className='flex flex-col items-center gap-y-6 mx-auto'>
          <div className='flex flex-col items-center gap-y-2'>
            <p className='font-medium text-3xl text-[#1E5BF6]'>No Plan exist</p>
            <p className='font-medium text-3xl text-[#1E5BF6]'>Start Working Out</p>
          </div>
          <img src={No_plan} className='size-60' />
        </div>
      }
    </div>
  )
}
