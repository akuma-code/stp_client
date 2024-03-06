import React from 'react'
import path_decibel from './../../Components/StpTable/StpPreset/images/decibels.jpg'
import path_energy from './../../Components/StpTable/StpPreset/images/energyCoeefs.jpg'
import path_light from './../../Components/StpTable/StpPreset/images/lightCoeff.jpg'
type InfoPageProps = {}

export const StpInfoPage: React.FC<InfoPageProps> = (props) => {



    return (
        <div className='flex flex-row gap-2 flex-grow flex-wrap p-4' >
            <div className='flex-grow'>
                <img src={ path_decibel } alt='decibels' />
            </div>
            <div className='flex-grow'>
                <img src={ path_energy } alt='energy' />
            </div>
            <div className='flex-grow'>
                <img src={ path_light } alt='light' />
            </div>



        </div>
    )
}