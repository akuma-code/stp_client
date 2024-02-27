import { Paper } from '@mui/material'
import React from 'react'
import { StpDataTable } from '../../Components/DataTable/StpDataTable'

type OverviewProps = object

export const OverView = (props: OverviewProps) => {



    return (
        <Paper sx={ { pb: 0, m: 1, bgcolor: 'beige', height: '100%' } } elevation={ 4 }>
            <StpDataTable />
        </Paper>
    )
}