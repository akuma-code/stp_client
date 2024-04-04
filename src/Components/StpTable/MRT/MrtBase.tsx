import {
    MaterialReactTable,
    useMRT_RowVirtualizer,
    useMaterialReactTable,
} from 'material-react-table';

import React from 'react'
import { useMRTData } from '../../../Hooks/MRT/useMRTData';
import { useLoadAllData } from '../../../Hooks/useLoadAllData';
import { StpData } from '../../StpTableView/StpDataTable';

const MrtBase = ({ stp_data }: { stp_data: StpData[] }) => {
    const { columns } = useMRTData()


    const table = useMaterialReactTable({
        columns,
        data: stp_data,
        enableRowSelection: true,
        enableDensityToggle: true,
        initialState: {
            density: 'compact'
        }
    })
    const rowVirtualizer = useMRT_RowVirtualizer(table);

    return (
        <MaterialReactTable table={ table } />
    )
}

export default MrtBase
