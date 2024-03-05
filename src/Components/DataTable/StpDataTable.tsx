import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useCallback, useMemo, useState } from 'react';

import { Stack } from '@mui/material';
import { _ID, _log } from '../../Helpers/helpersFns';
import { FilterItemParams, useCompare, useEnchancedFilter, useFilterTags, useSortAndFilter } from '../../Hooks/useCompare';
import { useAppContext } from '../../Hooks/useStoresContext';
import { StpItem, StpTags, depths } from '../StpTable/TableObjects';
import { EnhancedTableHead } from './EnhancedTableHead';

import { ItemFilteringProps, useCombinedFilter, useFilterReduce } from '../../Hooks/useFiltration';
import { StpTableToolbar } from './StpTableToolbar';
import { ReduceFilter } from '../../Hooks/useMemoFilter';


//__ Data Create*/



export type StpData = StpItem & { id: number }
export type Order = 'asc' | 'desc';



export function StpDataTable() {
    console.count("RENDER!")
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof StpData>('depth');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [RPP, setRowsPerPage] = useState(-1);
    const { StpStore: { table }, select, selectedItems, query, selectedTags, filterParams } = useAppContext()

    const sorted = useSortAndFilter(table, order, orderBy, query, filterParams)

    const handleRequestSort = useCallback((
        event: React.MouseEvent<unknown>,
        property: keyof StpData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }, [order, orderBy]);

    const handleSelectAllClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedItems.length >= 1) {
            select([])
            return
        }
        if (event.target.checked) {
            const newSelectedAll = sorted.map((n) => +n.id);

            select(newSelectedAll)
            return;
        }
        select([])

    }, [sorted, select, selectedItems.length]);

    const handleClick = useCallback((event: React.MouseEvent<unknown>, id: number) => {
        const store_selectedIndex = selectedItems.indexOf(id);
        let newSelected: number[] = [];

        if (store_selectedIndex === -1) {
            newSelected = newSelected.concat(selectedItems, id);
        } else if (store_selectedIndex === 0) {
            newSelected = newSelected.concat(selectedItems.slice(1));
        } else if (store_selectedIndex === selectedItems.length - 1) {
            newSelected = newSelected.concat(selectedItems.slice(0, -1));
        } else if (store_selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedItems.slice(0, store_selectedIndex),
                selectedItems.slice(store_selectedIndex + 1),
            );
        }
        if (selectedItems.length >= 5) newSelected = newSelected.slice(0, 5)
        select(newSelected)
    }, [select, selectedItems]);

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

    const isSelected = useCallback((id: number) => selectedItems.indexOf(id) !== -1, [selectedItems]);
    const hasTags = (item: StpData) => selectedTags.length > 0
        ? selectedTags.every(t => item.tags.includes(t as StpTags))
        : false

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0
        ? Math.max(0, (1 + page) * RPP - table.length)
        : 0;

    const visibleRows = useMemo(
        () => {

            const sliced = RPP !== -1
                ? sorted.slice(
                    page * RPP,
                    page * RPP + RPP)
                : sorted
            return sliced as unknown as StpData[]
        },
        [RPP, sorted, page]
    );

    return (
        <Box sx={ { width: '100%', height: '100%' } }>
            <Paper sx={ { mb: 2 } } elevation={ 4 }>

                <StpTableToolbar numSelected={ selectedItems.length } numFiltered={ sorted.length } />

                <TableContainer sx={ { overflowY: 'auto', maxHeight: '73vh', } } >
                    <Table
                        sx={ { minWidth: 750 } }
                        aria-labelledby="tableTitle"
                        size={ dense ? 'small' : 'medium' }
                        stickyHeader
                        padding='none'
                    >
                        <EnhancedTableHead
                            numSelected={ selectedItems.length }
                            order={ order }
                            orderBy={ orderBy }
                            onSelectAllClick={ handleSelectAllClick }
                            onRequestSort={ handleRequestSort }
                            rowCount={ sorted.length }
                        />


                        <TableBody>
                            {
                                visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(+row.id);
                                    const labelId = `enhanced-table-${index}`;
                                    // const isTagged = hasTags(row as unknown as StpData)
                                    return (
                                        <TableRow
                                            hover
                                            key={ row.id }
                                            onClick={ (event) => handleClick(event, +row.id) }
                                            role="checkbox"
                                            aria-checked={ isItemSelected }
                                            tabIndex={ -1 }
                                            selected={ isItemSelected }
                                            sx={ {
                                                cursor: 'pointer',
                                                // bgcolor: isTagged ? '#d1e8f8' : '#ffffffDE'
                                            } }
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
                                                sx={ { width: 'max-content', textWrap: 'nowrap' } }
                                            >
                                                { row.name }
                                            </TableCell>
                                            <TableCell align="center">{ row.depth }</TableCell>
                                            <TableCell align="center">{ row.cams }</TableCell>
                                            <TableCell align="center">{ row.weight }</TableCell>
                                            <TableCell align="center">{ row.Ro }</TableCell>
                                            <TableCell align="center">{ row.Det }</TableCell>
                                            <TableCell align="center">{ row.Ea }</TableCell>
                                            <TableCell align="center">{ row.Er }</TableCell>
                                            <TableCell align="center">{ row.Lr }</TableCell>
                                            <TableCell align="center">{ row.Lt }</TableCell>
                                            <TableCell align="center">{ row.Ra }</TableCell>
                                            <TableCell align="center">{ row.Rw }</TableCell>
                                            <TableCell align="center">{ row.S }</TableCell>

                                            <TableCell align="center">{ row.Sf }</TableCell>
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
                                    <TableCell colSpan={ 8 } />
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
                        rowsPerPageOptions={ [5, 10, 20, { value: -1, label: 'Все' }] }
                        component="div"
                        count={ sorted.length }
                        rowsPerPage={ RPP }
                        page={ page }
                        onPageChange={ handleChangePage }
                        onRowsPerPageChange={ handleChangeRowsPerPage }
                        id='rows_per_page_id'
                        labelRowsPerPage='Рядов на странице:'
                        labelDisplayedRows={ ({ from, to, count }) => `${from} – ${to} из ${count !== -1 ? count : `more than ${to}`}` }
                    />
                </Stack>
            </Paper>
        </Box>
    );
}
