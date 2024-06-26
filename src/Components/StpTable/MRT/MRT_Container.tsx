import {
    MRT_RowVirtualizer,
    MaterialReactTable,
    useMaterialReactTable
} from 'material-react-table';

import { Box, alpha } from '@mui/material';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useMRTData } from '../../../Hooks/MRT/useMRTData';
import { useQueryFiltersLoader, useQuerySelectedIdsLoader } from '../../../Hooks/QueryHooks/useQueryFiltersLoader';
import { useFilterContext } from '../../../Hooks/useFilterContext';

const MRT_Container = observer(() => {
    const query = useQueryFiltersLoader()
    const { filters: { ids } } = useFilterContext()
    const sq = useQuerySelectedIdsLoader({ selectedIds: ids })


    const { columnOrder, columns } = useMRTData()
    const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

    // const [sorting, setSorting] = useState<MRT_SortingState>([]);

    const table = useMaterialReactTable({
        data: sq.isSuccess ? sq.data : [],
        columns,
        localization: MRT_Localization_RU,
        meta: {
            totalRowCount: sq.data?.length
        },
        rowCount: sq.data?.length,
        enablePagination: false,
        enableRowSelection: true,
        enableDensityToggle: true,
        layoutMode: 'grid',
        enableRowNumbers: true,
        enableColumnOrdering: false,
        enableColumnResizing: false,
        rowNumberDisplayMode: 'static',
        // globalFilterFn: 'contains',
        enableStickyHeader: true,
        enableRowVirtualization: false,
        enableFacetedValues: true,
        enableColumnFilterModes: false,
        rowVirtualizerOptions: {
            overscan: 2,
            estimateSize: (index) => index + 5,

        },
        initialState: {
            density: 'compact',
            showColumnFilters: false,
        },
        state: {
            showSkeletons: query.isLoading,
            showProgressBars: query.isRefetching,
            columnOrder
        },
        columnFilterDisplayMode: 'subheader',
        enableFilterMatchHighlighting: true,
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
            filterVariant: 'autocomplete',
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
                enableColumnOrdering: false,
                size: 40,
                enableHiding: true,
                enableFilterMatchHighlighting: true,
                grow: 0,

            },
            'mrt-row-select': {
                enableColumnActions: false,
                enableHiding: true,
                size: 40,

            },
        },
        renderBottomToolbar: ({ table }) => {
            return (
                <Box textAlign={ 'center' } width={ '100%' }>
                    Total rows:  { table.getRowCount() }
                </Box>
            )
        },
        muiTableContainerProps: {
            sx: { maxHeight: '700px', }
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
        <Box sx={ { width: '98%', height: '100%', m: 1, mx: 'auto' } }>
            {
                // query.status === 'pending' ? <Loading text='обновление данных' /> :
                <MaterialReactTable table={ table }

                /> }
        </Box>
    )
})

export default MRT_Container
