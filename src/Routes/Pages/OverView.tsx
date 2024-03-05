import { Paper } from '@mui/material'
import React, { useMemo } from 'react'
import { StpData, StpDataTable, isJson } from '../../Components/DataTable/StpDataTable'
import { useLoaderData } from 'react-router-dom'

type OverviewProps = object

export const OverView = (props: OverviewProps) => {

    const data = useLoaderData() as string
    const memodata = useMemo(() => {
        const res: StpData[] = isJson(data) ? JSON.parse(data) : []
        return res
    }, [data])

    return (
        <Paper sx={ { pb: 0, m: 1, bgcolor: 'beige', height: '100%' } } elevation={ 4 }>
            <StpDataTable preload_data={ memodata } />
        </Paper>
    )
}