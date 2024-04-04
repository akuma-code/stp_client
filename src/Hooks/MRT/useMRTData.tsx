import { MRT_ColumnDef } from "material-react-table"
import { useMemo } from "react"
import { StpData } from "../../Components/StpTableView/StpDataTable"
import { Box, TableCell } from "@mui/material"
import { useStpQuery } from "../QueryHooks/useStpQuery"
import { useLoadAllData } from "../useLoadAllData"
type ColumnsData = MRT_ColumnDef<StpData>
export const useMRTData = () => {
    const query = useLoadAllData()
    const columns = useMemo<ColumnsData[]>(
        () => [
            {
                header: 'name',
                accessorKey: 'name',
                Cell: ({ cell }) => <TableCell>{ cell.getValue<string>() }</TableCell>

            },
            {
                accessorFn: (row) => row.depth,
                id: 'depth',
                header: 'depth',
                Header: <div>{ `Depth` }</div>,
                Cell: ({ cell }) => <Box>{ cell.getValue<number>().toLocaleString() }</Box>
            }
        ] as const
        , [])

    return { columns, data: query.data! }
}