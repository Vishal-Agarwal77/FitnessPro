import React from 'react'
import Current from '../Currrent Plan/Current'
import Total from './Statistics/Total'
import Statistics from './Statistics'
import PastRecord from './PastRecord/PastRecord'
import History from './History'

export default function Overall() {
    return (
        <>
            <Statistics/>
            {/* <PastRecord/> */}
            <History/>
        </>
    )
}
