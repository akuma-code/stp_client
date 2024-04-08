import { alpha } from "@mui/material"
import { MRT_ColumnOrderState, MRT_DefinedTableOptions, useMRT_TableOptions, type MRT_ColumnDef } from "material-react-table"
import { MRT_Localization_RU } from 'material-react-table/locales/ru'
import { useMemo } from "react"
import { StpTag } from "../../Components/StpTable/TableObjects"
import { StpData } from "../../Components/StpTableView/StpDataTable"
import { useLoadAllData } from "../useLoadAllData"

import { TagsAvatarGroup } from "../../Components/UI/TagAvatars"
import { CamAvatar } from "../../Components/UI/CamsAvatars"
export type ColumnsData = MRT_ColumnDef<StpData>
export const useMRTData = () => {

    const columnOrder: MRT_ColumnOrderState = [
        "mrt-row-numbers", "mrt-row-select", "name", "depth", "tags", "cams", "weight", "Ro", "Rw", "Det", "Ea", "Er", "Lr", "Lt", "Ra", "S", "Sf", "secure"
    ] as const

    const columns = useMemo<ColumnsData[]>(() => cols, [])
    const options: MRT_DefinedTableOptions<StpData> = useMRT_TableOptions({
        data: [],
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
            size: 25,
        },
        displayColumnDefOptions: {
            'mrt-row-numbers': {
                enableColumnOrdering: true,
                size: 25,
                enableHiding: true,
                enableFilterMatchHighlighting: true,
            },
            'mrt-row-select': {
                enableColumnActions: true,
                enableHiding: true,
                size: 60,
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




    return { options, columnOrder, columns }
}

export const cols: ColumnsData[] = [

    {
        // *** наименование/формула
        header: 'формула',
        Header: `Формула`,
        accessorKey: 'name',
        size: 100,
        maxSize: 150,
        grow: 1,
        filterVariant: 'autocomplete',
        muiTableBodyCellProps: {
            align: 'left',
            sx: { fontWeight: 'bold' }
        },

    },
    {
        // *** тэги \ свойства
        accessorKey: 'tags',
        id: 'tags',
        header: 'tags',
        Header: "Свойства",
        size: 60,
        grow: 1,
        enableSorting: false,

        // filterVariant: 'checkbox',

        muiTableBodyCellProps: {
            align: "center",
        },
        muiTableHeadCellProps: {
            align: 'center',
            sx: {
                borderWidth: '1px',
                borderCollapse: 'collapse',
                borderColor: "black",
            }
        },
        Cell: ({ cell }) => <TagsAvatarGroup tags={ cell.getValue<StpTag[]>() } />
    },
    {
        // *** толщина
        accessorKey: 'depth',
        id: 'depth',
        header: 'depth',
        Header: 'Толщина',
        size: 70,
        grow: 1,
        // filterVariant: 'select',
        // filterFn: 'fuzzy',
        // enableMultiSort: true,
        muiTableBodyCellProps: {
            align: 'center',
        },
        muiTableHeadCellProps: {
            align: 'center',
            sx: {
                borderWidth: '1px',
                borderCollapse: 'collapse',
                borderColor: "black",
            }
        },
        Cell: ({ cell, column }) => <> { cell.getValue<number>() }<em>мм</em> </>
    },
    {
        accessorKey: 'cams',
        id: 'cams',
        header: 'cams',
        Header: "Кол-во камер",
        size: 80,
        grow: 1,
        muiTableBodyCellProps: {
            align: 'center',
        },
        filterVariant: 'select',
        filterSelectOptions: [`1`, `2`],
        muiTableHeadCellProps: {
            align: 'center',
            sx: {
                borderWidth: '1px',
                borderCollapse: 'collapse',
                borderColor: "black",
            }
        },
        Cell: ({ cell }) => <CamAvatar cam_count={ cell.getValue<1 | 2>() } wh={ '1.5em' } />

    },
    {
        accessorKey: 'weight',
        id: 'weight',
        header: 'weight',
        Header: `Вес`,
        minSize: 130,
        grow: 0,
        muiTableHeadCellProps: {
            align: 'center',
            sx: {
                borderWidth: '1px',
                borderCollapse: 'collapse',
                borderColor: "black",
            }
        },
        muiTableBodyCellProps: {
            align: 'center',
        },
        Cell: ({ cell }) => <div> { cell.getValue<number>() } <em>кг/кв.м</em> </div>
    },
    {
        accessorKey: 'Ro',
        header: 'Ro',
        id: 'Ro',
        size: 35,
        grow: 1,
        enableColumnActions: false,
        muiTableBodyCellProps: {
            sx: { fontWeight: 'bold' },
            align: "center",
        }

    },
    {
        accessorKey: 'Rw',
        header: 'Rw',
        enableColumnActions: false,
        id: 'Rw',
        size: 35,
        grow: 1,
        muiTableBodyCellProps: {
            sx: { fontWeight: 'bold' },
            align: "center",
        }

    },
    {
        accessorKey: 'Det',
        header: 'Det',
        enableColumnActions: false,
        id: 'Det',
        size: 30,
        grow: 1,

    },
    {
        accessorKey: 'Ea',
        header: 'Ea',
        enableColumnActions: false,
        id: 'Ea',
        size: 30,
        grow: 1,

    },
    {
        accessorKey: 'Er',
        header: 'Er',
        enableColumnActions: false,
        id: 'Er',
        size: 30,
        grow: 1,

    },
    {
        accessorKey: 'Lr',
        header: 'Lr',
        enableColumnActions: false,
        id: 'Lr',
        size: 30,
        grow: 1,

    },
    {
        accessorKey: 'Lt',
        header: 'Lt',
        enableColumnActions: false,
        id: 'Lt',
        size: 30,
        grow: 1,

    },
    {
        accessorKey: 'Ra',
        header: 'Ra',
        enableColumnActions: false,
        id: 'Ra',
        size: 30,
        grow: 1,

    },
    {
        accessorKey: 'S',
        header: 'S',
        enableColumnActions: false,
        id: 'S',
        size: 30,
        grow: 1,

    },
    {
        accessorKey: 'Sf',
        header: 'Sf',
        enableColumnActions: false,
        id: 'Sf',
        size: 30,
        grow: 1,

    },
    {
        accessorKey: 'secure',
        header: 'secure',
        enableColumnActions: false,
        minSize: 30,
        grow: 1,
        size: 30,
        Header: 'Secure'
    },

] 