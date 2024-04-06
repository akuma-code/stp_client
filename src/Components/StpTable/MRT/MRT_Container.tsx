import {
    MRT_RowVirtualizer,
    MRT_SortingState,
    MaterialReactTable,
    useMaterialReactTable
} from 'material-react-table';

import { Box, alpha } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMRTData, ColumnsData } from '../../../Hooks/MRT/useMRTData';
import { StpData } from '../../StpTableView/StpDataTable';
import { useLoadAllData } from '../../../Hooks/useLoadAllData';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';

const MRT_Container = ({ stp_data }: { stp_data?: StpData[] }) => {
    const query = useLoadAllData()
    const { columnOrder, columns } = useMRTData()
    const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

    // const [sorting, setSorting] = useState<MRT_SortingState>([]);

    const table = useMaterialReactTable({
        data: query.isSuccess ? query.data : [],
        localization: MRT_Localization_RU,
        columns,
        meta: {
            totalRowCount: 128
        },
        enablePagination: false,
        enableRowSelection: true,
        enableDensityToggle: true,
        layoutMode: 'grid',
        enableRowNumbers: true,
        enableColumnOrdering: false,
        enableColumnResizing: false,
        rowNumberDisplayMode: 'static',
        enableStickyHeader: true,

        enableRowVirtualization: false,

        rowVirtualizerOptions: {
            overscan: 2,
            estimateSize: () => 128,
        },
        initialState: {
            density: 'compact',
        },
        state: {
            // showSkeletons: query.isLoading,
            columnOrder
        },
        defaultColumn: {
            minSize: 10,
            maxSize: 150, //allow columns to get larger than default
            size: 80, //make columns wider by default

            // grow: 0,
            sortDescFirst: false,
            enableColumnActions: true,
            enableResizing: true,
            muiTableBodyCellProps: {
                align: 'center',
            },
            muiTableHeadCellProps: {
                sx: {
                    borderWidth: '1px',
                    borderCollapse: 'collapse',
                    borderColor: "black",
                },
            }
        },
        defaultDisplayColumn: {
            size: 40,
            maxSize: 40,
            grow: 1,
            muiTableHeadCellProps: {
                align: 'center',
                sx: {
                    borderWidth: '1px',
                    borderCollapse: 'collapse',
                    borderColor: "black",
                },
            }
        },
        displayColumnDefOptions: {
            'mrt-row-numbers': {
                enableColumnOrdering: true,
                size: 40,
                enableHiding: true,
                enableFilterMatchHighlighting: true,
                grow: 0,

            },
            'mrt-row-select': {
                enableColumnActions: true,
                enableHiding: true,
                size: 40,
            },
        },

        muiTableContainerProps: {
            sx: { maxHeight: '740px', }
        },
        muiTableBodyRowProps: ({ row }) => row.index % 2 === 0
            ? { sx: { bgcolor: (theme) => alpha(theme.palette.primary.main, .1) } }
            : { sx: { bgcolor: (theme) => alpha(theme.palette.secondary.main, .1) } },
        muiLinearProgressProps: ({ isTopToolbar }) => ({
            color: 'error',
            sx: { display: isTopToolbar ? 'none' : 'block' }, //only show top toolbar progress bar
        }),

    })
    // useEffect(() => {
    //     //scroll to the top of the table when the sorting changes
    //     try {
    //         // rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [sorting]);
    return (
        <Box sx={ { width: '100%', height: '100%', m: 1 } }>

            <MaterialReactTable table={ table } />
        </Box>
    )
}

export default MRT_Container
