import { Paper } from '@mui/material'
import React, { Suspense, useMemo } from 'react'
import { StpData, StpDataTable, isJson } from '../../Components/DataTable/StpDataTable'
import { useLoaderData } from 'react-router-dom'
import { useAppContext } from '../../Hooks/useStoresContext'

type OverviewProps = object

export const OverView = (props: OverviewProps) => {
    const { StpStore } = useAppContext()
    const data = useLoaderData() as string
    const memodata = useMemo(() => {
        const res: StpData[] = isJson(data) ? JSON.parse(data) : []
        StpStore.loadTable(res)
        return res
    }, [StpStore, data])

    return (
        <Paper sx={ { pb: 0, m: 1, bgcolor: 'beige', height: '100%' } } elevation={ 4 }>
            <Suspense fallback={
                <div>LOADING</div>
            }>

                <StpDataTable preload_data={ memodata } />
            </Suspense>
        </Paper>
    )
}