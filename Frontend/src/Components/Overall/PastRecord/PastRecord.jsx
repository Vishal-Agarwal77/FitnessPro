import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { CategoryScale, Filler } from "chart.js";
import axios from 'axios';
import { background } from '@cloudinary/url-gen/qualifiers/focusOn';

Chart.register(CategoryScale, Filler);

export const options = {
    responsive: true,
    tension: 0.3, // 2. Set the tension (curvature) of the line to your liking.  (You may want to lower this a smidge.)
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};

function ColorCode(heading){
    if(heading==='Calories Burned'){
        return {
            border:"rgb(255, 99, 132)",
            background:"rgba(255, 0, 0)",
            above:"rgba(255, 0, 0, 0.3)"
        }
    }
    else if(heading==='Time Spent'){
        return {
            border:"rgb(1, 149, 255)",
            background:"rgba(78, 180, 252)",
            above:"rgba(78, 180, 252, 0.3)"
        }
    }
    else{
        return{
            border:"rgb(8, 223, 153)",
            background:"rgba(113, 235, 195)",
            above:"rgba(113, 235, 195, 0.3)"
        }
    }
}

export default function PastRecord({heading,label,data}) {
    const [ColorCode, setColorCode] = useState()
    useEffect(() => {
        if(heading==='Calories Burned'){
            setColorCode({
                border:"rgb(252, 83, 119)",
                background:"rgba(250, 132, 157)",
                above:"rgba(250, 132, 157, 0.3)"
            })
        }
        else if(heading==='Time Spent'){
            setColorCode({
                border:"rgb(1, 149, 255)",
                background:"rgba(78, 180, 252)",
                above:"rgba(78, 180, 252, 0.3)"
            })
        }
        else{
            setColorCode({
                border:"rgb(8, 223, 153)",
                background:"rgba(113, 235, 195)",
                above:"rgba(113, 235, 195, 0.3)"
            })
        }
    }, [])
    return (ColorCode &&
        <div className='min-w-[630px] rounded-xl px-6 bg-white flex flex-col gap-y-8 py-8 shadow-[15px_15px_20px_-5px_rgba(220,234,245,1)] text-gray-700 max-[1324px]:min-w-full'>
            <p className='text-3xl font-medium ms-6'>{heading}</p>
            <Line
                datasetIdKey='id'
                data={{
                    labels:label,
                    datasets: [
                        {
                            id: 1,
                            label: '',
                            data: data,
                            borderColor: ColorCode.border,
                            backgroundColor: ColorCode.background,
                            fill: {
                                target: "origin", // 3. Set the fill options
                                above: ColorCode.above
                            }
                        },
                    ],
                }}
                options={options}
            />
        </div>
    )
}
