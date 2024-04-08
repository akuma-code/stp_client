/* eslint-disable react/jsx-pascal-case */
import React, { PropsWithChildren } from 'react'
import MRT_Container from '../../../Components/StpTable/MRT/MRT_Container'
import { useLoadAllData } from '../../../Hooks/useLoadAllData'

const MRTDataPage: React.FC<{}> = () => {

    const { data, isSuccess } = useLoadAllData()

    return (
        <>

            <MRT_Container />

        </>
    )
}

export default MRTDataPage
