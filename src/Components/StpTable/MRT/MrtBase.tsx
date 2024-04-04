import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

import React from 'react'
import { useMRTData } from '../../../Hooks/MRT/useMRTData';

const MrtBase = () => {
    const { columns, data } = useMRTData()
    const table = useMaterialReactTable({
        columns,
        data
    })
    return (
        <MaterialReactTable table={ table } />
    )
}

export default MrtBase
