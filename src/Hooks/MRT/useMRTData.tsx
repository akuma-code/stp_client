import { MRT_ColumnDef, useMaterialReactTable } from "material-react-table"
import { useMemo } from "react"
import { StpData } from "../../Components/StpTableView/StpDataTable"
import { Box, TableCell, alpha } from "@mui/material"
import { useStpQuery } from "../QueryHooks/useStpQuery"
import { useLoadAllData } from "../useLoadAllData"
import { StpTag } from "../../Components/StpTable/TableObjects"
import { DataCell } from "../../Components/StpTableView/StpTableRow"
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { TagsAvatarGroup } from "../../Components/UI/TagAvatars"
type ColumnsData = MRT_ColumnDef<StpData>
export const useMRTData = () => {
    const query = useLoadAllData()
    const columns = useMemo<ColumnsData[]>(() => cols, [])

    const table = useMaterialReactTable({
        localization: MRT_Localization_RU,
        columns,
        data: query.isSuccess ? query.data : [],
        enablePagination: false,
        enableRowSelection: true,
        enableDensityToggle: true,
        layoutMode: 'grid',
        enableRowNumbers: false,
        enableColumnOrdering: false,
        enableColumnResizing: true,
        rowNumberDisplayMode: 'static',
        enableStickyHeader: true,
        enableRowVirtualization: false,
        rowVirtualizerOptions: {
            overscan: 5,
            // estimateSize: (index) => index * 10
        },
        muiTableFooterProps: {
            sx: { bgcolor: 'blue' }
        },
        muiTableContainerProps: {
            sx: { maxHeight: '75vh', maxWidth: '100vw' }
        },
        muiTableBodyRowProps: ({ row }) => row.index % 2 === 0
            ? { sx: { bgcolor: (theme) => alpha(theme.palette.primary.main, .3) } }
            : { sx: { bgcolor: (theme) => alpha(theme.palette.secondary.main, .3) } },
        initialState: {
            density: 'compact',
            showProgressBars: true,
            isLoading: query.isLoading,
        },
        // muiLinearProgressProps: ({ isTopToolbar }) => ({
        //     color: 'warning',
        //     sx: { display: isTopToolbar ? 'block' : 'none' }, //only show top toolbar progress bar

        // }),
        state: {
            isLoading: query.isLoading,
            showProgressBars: query.isRefetching,
            showSkeletons: query.isLoading,

        },
        defaultColumn: {

            maxSize: 200, //allow columns to get larger than default
            size: 80, //make columns wider by default
            grow: 0,
            sortDescFirst: false,
            enableColumnActions: false,
            enableResizing: false,
            muiTableBodyCellProps: {
                align: 'center',
            },
            muiTableHeadCellProps: {
                align: 'center'
            }

        },
        defaultDisplayColumn: {
            size: 200,

        },
        displayColumnDefOptions: {


            'mrt-row-numbers': {
                enableColumnOrdering: true,
                size: 10,
                // Cell: ({ row }) => `${row.index + 1})`
            },
            'mrt-row-select': {
                enableColumnActions: false,
                enableHiding: true,
                size: 60,

            },
        }

    })
    return { table }
}

const cols: ColumnsData[] = [
    {
        id: 'number',
        header: 'number',
        Header: '#',
        columnDefType: 'display',
        enableSorting: true,
        Cell: ({ row }) => <b>{ row.index + 1 }.</b>,
        size: 25
    },
    {
        header: 'формула',
        Header: `Формула`,
        accessorKey: 'name',
        size: 100,
        grow: 1,
        muiTableHeadCellProps: {
            align: 'left'
        },
        muiTableBodyCellProps: {
            align: 'left',
            sx: { fontWeight: 'bold' }
        },

    },
    {
        accessorKey: 'tags',
        id: 'tags',
        header: 'tags',
        Header: "Свойства",
        size: 60,
        grow: 1,
        enableSorting: false,
        muiTableHeadCellProps: {
            align: 'left'
        },
        muiTableBodyCellProps: {
            align: 'left',

        },
        Cell: ({ cell }) => <TagsAvatarGroup tags={ cell.getValue<StpTag[]>() } />
    },
    {
        accessorKey: 'depth',
        id: 'depth',
        header: 'depth',
        Header: <div>Толщина</div>,
        size: 70,
        grow: 0,
        Cell: ({ cell }) => <div> { cell.getValue<number>() } <em>мм</em> </div>
    },
    {
        accessorKey: 'cams',
        id: 'cams',
        header: 'cams',
        Header: "Кол-во камер",
        size: 60,
        grow: 1,
        muiTableHeadCellProps: {
            align: 'center',
            sx: { flexWrap: 'wrap' }
        }
        // Cell: ({ cell }) => <DataCell primary={ cell.getValue<number>() } />
    },
    {
        accessorKey: 'weight',
        id: 'weight',
        header: 'weight',
        Header: <div>Вес</div>,
        minSize: 50,
        grow: 0,
        Cell: ({ cell }) => <div> { cell.getValue<number>() } <em>кг/кв.м</em> </div>
    },
    {
        accessorKey: 'Ro',
        header: 'Ro',
        id: 'Ro',
        size: 30,
        grow: 0,

    },
    {
        accessorKey: 'Rw',
        header: 'Rw',
        id: 'Rw',
        size: 30,
        grow: 0,

    },
    {
        accessorKey: 'Det',
        header: 'Det',
        id: 'Det',
        size: 30,
        grow: 0,

    },
    {
        accessorKey: 'Ea',
        header: 'Ea',
        id: 'Ea',
        size: 30,
        grow: 0,

    },
    {
        accessorKey: 'Er',
        header: 'Er',
        id: 'Er',
        size: 30,
        grow: 0,

    },
    {
        accessorKey: 'Lr',
        header: 'Lr',
        id: 'Lr',
        size: 30,
        grow: 0,

    },
    {
        accessorKey: 'Lt',
        header: 'Lt',
        id: 'Lt',
        size: 30,
        grow: 0,

    },
    {
        accessorKey: 'Ra',
        header: 'Ra',
        id: 'Ra',
        size: 30,
        grow: 0,

    },
    {
        accessorKey: 'S',
        header: 'S',
        id: 'S',
        size: 30,
        grow: 0,

    },
    {
        accessorKey: 'Sf',
        header: 'Sf',
        id: 'Sf',
        size: 30,
        grow: 0,

    },
    {
        accessorKey: 'secure',
        header: 'secure',
        minSize: 30,
        grow: 0,
        size: 30,
        Header: 'Secure'
    },

] as const