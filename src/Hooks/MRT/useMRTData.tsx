import { MRT_ColumnDef } from "material-react-table"
import { useMemo } from "react"
import { StpData } from "../../Components/StpTableView/StpDataTable"
import { Box, TableCell } from "@mui/material"
import { useStpQuery } from "../QueryHooks/useStpQuery"
import { useLoadAllData } from "../useLoadAllData"
import { StpTag } from "../../Components/StpTable/TableObjects"
import { DataCell } from "../../Components/StpTableView/StpTableRow"
type ColumnsData = MRT_ColumnDef<StpData>
export const useMRTData = () => {
    const query = useLoadAllData()
    const columns = useMemo<ColumnsData[]>(
        () => [
            {
                header: 'Formula',
                accessorKey: 'name',
                // Cell: ({ cell }) => <DataCell primary={ cell.getValue<string>() } />

            },
            {
                accessorFn: (row) => row.depth,
                id: 'depth',
                header: 'depth',
                Header: <div>{ `Depth` }</div>,
                // Cell: ({ cell }) => <DataCell primary={ cell.getValue<number>() } />
            },
            {
                accessorFn: (row) => row.cams,
                id: 'cams',
                header: 'cams',
                Header: <div>{ `cams` }</div>,
                // Cell: ({ cell }) => <DataCell primary={ cell.getValue<number>() } />
            },
            {
                accessorFn: (row) => row.tags,
                id: 'tags',
                header: 'tags',
                Header: <div>{ `tags` }</div>,
                // Cell: ({ cell }) => <DataCell primary={ cell.getValue<StpTag>() } />
            },
            {
                accessorFn: (row) => row.weight,
                id: 'weight',
                header: 'weight',
                Header: <div>{ `weight` }</div>,
                // Cell: ({ cell }) => <TableCell>{ cell.getValue<number>().toLocaleString() }</TableCell>
            },

        ] as const
        , [])

    return { columns, data: query.data! }
}