import { MRT_ColumnDef } from "material-react-table"
import { useMemo } from "react"
import { StpData } from "../../Components/StpTableView/StpDataTable"
import { Box, TableCell } from "@mui/material"
import { useStpQuery } from "../QueryHooks/useStpQuery"
import { useLoadAllData } from "../useLoadAllData"
import { StpTag } from "../../Components/StpTable/TableObjects"
type ColumnsData = MRT_ColumnDef<StpData>
export const useMRTData = () => {
    const query = useLoadAllData()
    const columns = useMemo<ColumnsData[]>(
        () => [
            {
                header: 'Formula',
                accessorKey: 'name',
                Cell: ({ cell }) => <TableCell>{ cell.getValue<string>() }</TableCell>

            },
            {
                accessorFn: (row) => row.depth,
                id: 'depth',
                header: 'depth',
                Header: <div>{ `Depth` }</div>,
                Cell: ({ cell }) => <TableCell>{ cell.getValue<number>().toLocaleString() }</TableCell>
            },
            {
                accessorFn: (row) => row.cams,
                id: 'cams',
                header: 'cams',
                Header: <div>{ `cams` }</div>,
                Cell: ({ cell }) => <TableCell>{ cell.getValue<number>().toLocaleString() }</TableCell>
            },
            {
                accessorFn: (row) => row.tags,
                id: 'tags',
                header: 'tags',
                Header: <div>{ `tags` }</div>,
                Cell: ({ cell }) => <TableCell>{ cell.getValue<StpTag[]>() }</TableCell>
            },
            {
                accessorFn: (row) => row.weight,
                id: 'weight',
                header: 'weight',
                Header: <div>{ `weight` }</div>,
                Cell: ({ cell }) => <TableCell>{ cell.getValue<number>().toLocaleString() }</TableCell>
            },

        ] as const
        , [])

    return { columns, data: query.data! }
}