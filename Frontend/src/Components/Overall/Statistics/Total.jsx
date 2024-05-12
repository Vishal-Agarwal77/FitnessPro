import React, { useEffect, useState } from 'react'

// function MainContainer(name){
//     if(name==='calories'){
//         return 'bg-[#f2bc85]'
//     }
//     else if(name==='time'){
//         return 'bg-[#8ed199]'
//     } 
//     return ''
// }
function Icon(name){
    if(name==="calories"){
        return <i class="fa-solid fa-fire-flame-curved fa-2xl px-1"></i>
    }
    else if(name==="time"){
        return <i class="fa-solid fa-clock fa-2xl"></i>
    }
    else if(name==='total'){
        return <i class="fa-solid fa-dumbbell fa-2xl"></i>
    }
}

export default function Total({ name ,val}) {
    const [Style, setStyle] = useState({
        MainContainer: '',
        iconbg: '',
        unit: "",
        MainHeader: ""
    });
    useEffect(() => {
        if (name === "calories") {
            setStyle({
                MainContainer: 'bg-[#f2bc85]',
                iconbg: 'bg-[#F7820B]',
                unit: "Calories",
                MainHeader: "Total Calories Burned"
            })
        }
        else if (name === "time") {
            setStyle({
                MainContainer: 'bg-[#aef2c0]',
                iconbg: 'bg-[#3cdf57]',
                unit: "Minutes",
                MainHeader: "Total Minutes Spent"
            })
        }
        else if(name==='total'){
            setStyle({
                MainContainer:'bg-[#e1c4ff]',
                iconbg:'bg-[#bf83ff]',
                unit:'Workouts',
                MainHeader:'Total Workouts Done'
            })
            // console.log("total")
        }
    }, [])
    return (
        <div className={`min-w-[350px] flex flex-col px-6 py-4 rounded-2xl gap-y-6 flex-1 ${Style.MainContainer} `}>
            <div className={`w-fit h-fit px-4 py-5 rounded-full text-white ${Style.iconbg}`}>
                {/* <i class="fa-solid fa-fire-flame-curved fa-2xl"></i> */}
                {Icon(name)}
            </div>
            <div className='flex flex-col gap-y-2'>
                <p className='text-2xl font-medium'>{val?.toFixed(0)} {Style.unit}</p>
                <p className='text-base font-medium text-gray-700'>{Style.MainHeader}</p>
            </div>
        </div>
    )
}
