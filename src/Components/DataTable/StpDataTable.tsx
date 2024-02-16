import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { StpItem } from '../StpTable/TableObjects';
import { EnhancedTableHead } from './EnhancedTableHead';
import { Stack } from '@mui/material';
import { useAppContext } from '../../Hooks/useStoresContext';
import { StpTableToolbar } from './StpTableToolbar';

//__ Data Create*/
export type StpData = (Omit<StpItem, '_type'> & { id: number })



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


export function StpDataTable() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof StpData>('cams');
    const [selected, setSelected] = React.useState<number[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const { StpContext } = useAppContext()

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof StpData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = StpContext.table.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - StpContext.table.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(StpContext.table, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <Box sx={ { width: '100%' } }>
            <Paper sx={ { width: '100%', mb: 2 } }>
                <StpTableToolbar numSelected={ selected.length } />

                <TableContainer sx={ { overflowY: 'auto', maxHeight: '72vh' } }>
                    <Table
                        sx={ { minWidth: 750 } }
                        aria-labelledby="tableTitle"
                        size={ dense ? 'small' : 'medium' }
                        stickyHeader
                    >
                        <EnhancedTableHead
                            numSelected={ selected.length }
                            order={ order }
                            orderBy={ orderBy }
                            onSelectAllClick={ handleSelectAllClick }
                            onRequestSort={ handleRequestSort }
                            rowCount={ StpContext.table.length }
                        />


                        <TableBody>
                            { visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(+row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={ (event) => handleClick(event, +row.id) }
                                        role="checkbox"
                                        aria-checked={ isItemSelected }
                                        tabIndex={ -1 }
                                        key={ row.id }
                                        selected={ isItemSelected }
                                        sx={ { cursor: 'pointer' } }
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={ isItemSelected }
                                                inputProps={ {
                                                    'aria-labelledby': labelId,
                                                } }
                                                id={ labelId }
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={ labelId }
                                            scope="row"
                                            padding="none"
                                            sx={ { minWidth: 'fit-content' } }
                                        >
                                            { row.name }
                                        </TableCell>
                                        <TableCell align="center">{ row.cams }</TableCell>
                                        <TableCell align="center">{ row.depth }</TableCell>
                                        <TableCell align="right">{ row.Ro }</TableCell>
                                        <TableCell align="right">{ row.Det }</TableCell>
                                        <TableCell align="right">{ row.Ea }</TableCell>
                                        <TableCell align="right">{ row.Er }</TableCell>
                                        <TableCell align="right">{ row.Lr }</TableCell>
                                        <TableCell align="right">{ row.Lt }</TableCell>
                                        <TableCell align="right">{ row.Ra }</TableCell>
                                        <TableCell align="right">{ row.Rw }</TableCell>
                                        <TableCell align="right">{ row.S }</TableCell>
                                        <TableCell align="right">{ row.Sc }</TableCell>
                                        <TableCell align="right">{ row.Sf }</TableCell>
                                        <TableCell align="center">{ row.secure }</TableCell>

                                    </TableRow>
                                );
                            }) }
                            { emptyRows > 0 && (
                                <TableRow
                                    style={ {
                                        height: (dense ? 33 : 53) * emptyRows,
                                    } }
                                >
                                    <TableCell colSpan={ 6 } />
                                </TableRow>
                            ) }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack direction={ 'row' } justifyContent={ 'space-between' }>

                    <FormControlLabel
                        control={ <Switch checked={ dense } onChange={ handleChangeDense } id='dense_checkbox' /> }
                        label="Уменьшить отступ"
                        sx={ { ml: 4 } }
                    />
                    <TablePagination
                        rowsPerPageOptions={ [5, 10, 15, 20, { value: -1, label: 'All' }] }
                        component="div"
                        count={ StpContext.table.length }
                        rowsPerPage={ rowsPerPage }
                        page={ page }
                        onPageChange={ handleChangePage }
                        onRowsPerPageChange={ handleChangeRowsPerPage }
                        id='rows_per_page_id'
                    />
                </Stack>
            </Paper>
        </Box>
    );
}
