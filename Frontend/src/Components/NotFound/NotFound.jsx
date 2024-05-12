import React from 'react'
import notFound from '../../assets/notfound.png'

export default function NotFound() {
    return (
        <div className='w-screen min-h-screen flex flex-col items-center justify-center text-[#36abcf] gap-y-4'>
            <img src={notFound} className='size-64  border-red-600 translate-y-20 opacity-70'/>
            <div className=' border-red-600 flex items-center h-fit w-fit z-10 w-[13.5rem] justify-end'>
                <p className=' border-red-600 w-fit h-10 text-4xl font-medium -rotate-[90deg] translate-x-[25%]'>Error</p>
                <p className=' text-8xl  border-red-600 h-fit w-44 font-bold'>404</p>
            </div>
            <p className='text-xl font-medium'>Sorry, the page not found</p>
        </div>
    )
}
