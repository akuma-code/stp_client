import { Paper } from '@mui/material'
import React from 'react'
import { StpDataTable } from '../../Components/DataTable/StpDataTable'

type OverviewProps = object

export const OverView = (props: OverviewProps) => {
    return (
        <Paper sx={ { px: 5, py: 2, bgcolor: '#a5a5a5' } } elevation={ 4 }>
            <StpDataTable />
        </Paper>
    )
}