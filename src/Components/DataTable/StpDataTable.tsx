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

import { Stack, TableFooter, alpha } from '@mui/material';
import { useSortAndFilter } from '../../Hooks/useCompare';
import { useAppContext } from '../../Hooks/useStoresContext';
import { StpItem, StpTags } from '../StpTable/TableObjects';
import { EnhancedTableHead } from './EnhancedTableHead';

import { StpTableToolbar } from './StpTableToolbar';
import { useLoaderData } from 'react-router-dom';
import { StpDataLoad } from '../../Routes/AppRouter';


//__ Data Create*/



export type StpData = StpItem & { id: number }
export type Order = 'asc' | 'desc';

export const isJson = (i: any) => JSON.parse(i) ? true : false

export function StpDataTable({ preload_data }: { preload_data?: StpData[] }) {
    console.count("RENDER!")
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof StpData>('depth');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [RPP, setRowsPerPage] = useState(-1);
    const [checkedCells, setCheckedCells] = useState<number[]>([])
    const memodata = preload_data ?? []
    // useMemo(() => {
    //     return isJson(data) ? JSON.parse(data) : []
    // }, [data])

    const { select, selectedItems, query, selectedTags, filterParams } = useAppContext()
    const sorted = useSortAndFilter(memodata, order, orderBy, query, filterParams)
    // const [data, loading] = useLazyDataLoad(table, order, orderBy, query, filterParams)
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
    }, [selectedItems, select]);

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
    const isFiltersOn = filterParams.cams.length !== 0 || filterParams.depth.length !== 0 || filterParams.tags.length !== 0 || query !== ""
    const hasTags = (item: StpData) => selectedTags.length > 0
        ? selectedTags.every(t => item.tags.includes(t as StpTags))
        : false

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0
        ? Math.max(0, (1 + page) * RPP - memodata.length)
        : 0;

    const visibleRows = useMemo(
        () => {
            // console.log('loading: ', loading)
            const sliced = sorted.slice(
                page * RPP,
                page * RPP + RPP)
            return sliced as unknown as StpData[]
        },
        [RPP, page, sorted]
    );

    return (
        <Box sx={ { width: '100%', height: '100%' } }>
            <Paper sx={ { mb: 2 } } elevation={ 4 }>

                <StpTableToolbar numSelected={ selectedItems.length } numFiltered={ sorted.length } />

                <TableContainer sx={ { overflowY: 'auto', maxHeight: '73vh', position: 'relative' } } >
                    <Table
                        sx={ { minWidth: 750, position: 'relative' } }
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
                    {
                        (selectedItems.length !== 0 || isFiltersOn) &&

                        <TableFooter sx={ {
                            bgcolor: (theme) => alpha(theme.palette.primary.main, .7),
                            position: 'sticky', display: 'flex', columnGap: 6, bottom: 8, justifyContent: 'center', color: 'whitesmoke'
                        } } component={ Paper } elevation={ 4 }>


                            {
                                selectedItems.length !== 0 &&
                                <Box>
                                    Выбрано: { selectedItems.length }
                                </Box>
                            }
                            { isFiltersOn &&
                                <Box>
                                    Совпадений найдено: { sorted.length }
                                </Box>
                            }
                        </TableFooter> }

                </TableContainer>
                <Stack direction={ 'row' } justifyContent={ 'space-between' } maxHeight={ 55 }>

                    <FormControlLabel
                        control={ <Switch checked={ dense } onChange={ handleChangeDense } id='dense_checkbox' /> }
                        label="Уменьшить отступы"
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
                        labelRowsPerPage='Показывать количество строчек на странице: '
                        labelDisplayedRows={ ({ from, to, count }) => `${from} – ${to} из ${count !== -1 ? count : `more than ${to}`}` }
                    />
                </Stack>
            </Paper>
        </Box>
    );
}
