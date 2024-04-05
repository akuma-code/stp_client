import {
    MaterialReactTable,
    useMRT_RowVirtualizer,
    useMaterialReactTable,
} from 'material-react-table';

import React, { Suspense } from 'react'
import { useMRTData } from '../../../Hooks/MRT/useMRTData';
import { useLoadAllData } from '../../../Hooks/useLoadAllData';
import { StpData } from '../../StpTableView/StpDataTable';
import { Box, Paper } from '@mui/material';
import { Loading } from '../../UI/SuspenseLoad';

const MRT_Container = ({ stp_data }: { stp_data: StpData[] }) => {
    const { table } = useMRTData()


    // const table = useMaterialReactTable({
    //     columns,
    //     data: stp_data,
    //     enablePagination: false,
    //     enableRowSelection: true,
    //     enableDensityToggle: true,
    //     // enableBottomToolbar: true,
    //     // enableStickyFooter: true,
    //     muiTableFooterProps: {
    //         sx: { bgcolor: 'blue' }
    //     },
    //     muiTableContainerProps: {
    //         sx: { maxHeight: '75vh', maxWidth: '100vw' }
    //     },

    //     initialState: {
    //         density: 'compact',
    //         showProgressBars: false,
    //     },
    //     defaultColumn: {
    //         minSize: 20, //allow columns to get smaller than default
    //         maxSize: 300, //allow columns to get larger than default
    //         size: 100, //make columns wider by default
    //     },
    // })


    return (
        <Box sx={ { width: '100%', height: '100%' } }>
            <Paper sx={ { m: 1 } } elevation={ 2 }>

                <Suspense fallback={ <Loading /> }>

                    <MaterialReactTable table={ table } />
                </Suspense>
            </Paper>
        </Box>
    )
}

export default MRT_Container
