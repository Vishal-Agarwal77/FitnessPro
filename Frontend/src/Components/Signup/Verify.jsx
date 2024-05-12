import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
}

function MsgContent(success,msg){
    console.log(msg);
    return( 
    <div className='flex gap-x-2 flex items-center justify-center px-2 '>
        {success
            ? <i className="fa-solid fa-circle-check fa-lg" style={{color: "#4cec41"}}></i>
            : <i className="fa-solid fa-circle-xmark fa-lg" style={{color: "#df2626"}}></i>
        }
        <p>{msg}</p>
    </div>)
}

export default function Verify() {
    const [Content, setContent] = useState("OTP sent successfully");
    const [State, setState] = useState({
        open: true,
        Transition: SlideTransition
    })
    const [FormData, setFormData] = useState({
        otp: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await axios.post('http://localhost:3000/api/v1/verify', FormData)
        if (response.status === 200) {
            setContent("OTP Verified Successfully")
            setState({ ...State, open: true });
            console.log("OTP verified")
            console.log(FormData)
        }
    }
    const handleClose = () => {
        setState({ ...State, open: !State.open });
    }
    return (
        <>
            <Snackbar
                key={Content}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={State.open}
                TransitionComponent={State.Transition}
                ContentProps={{
                    sx:{
                        bgcolor: "white",
                        color:"#424242",
                        fontSize:"17px"
                    }
                }}
                autoHideDuration={2000}
                onClose={handleClose}
                message={MsgContent(true,Content)}
            />
            <div className='flex flex-col gap-y-6 px-4'>
                <form className='flex flex-col gap-y-6' onSubmit={handleSubmit}>
                    <label htmlFor='otp' className='text-lg text-gray-800'>OTP</label>
                    <input type='number' name='otp' className='px-2 py-[2px] border-[1px] border-gray-400 rounded-md text-lg test-gray-800' value={FormData.otp} onChange={(e) => { setFormData({ ...FormData, otp: e.target.value }) }} />
                    <button type='submit' className='bg-[#64B5F6] w-fit mx-auto px-4 py-1 text-lg text-white rounded-md mt-12'>Submit</button>
                </form>
            </div>
        </>
    )
}
