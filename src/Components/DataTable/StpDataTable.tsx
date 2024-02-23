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
import * as React from 'react';

import { Stack } from '@mui/material';
import { useSort } from '../../Hooks/useCompare';
import { useAppContext } from '../../Hooks/useStoresContext';
import { useTags } from '../../Hooks/useTags';
import { StpItem } from '../StpTable/TableObjects';
import { EnhancedTableHead } from './EnhancedTableHead';
import { StpTableToolbar } from './StpTableToolbar';

//__ Data Create*/
//TODO: перенести все данные в контекст
//TODO: вынести логику селекторов в хук
//TODO: добавить добавление в сравнение, стартовать сравнение по кнопке, где сейчас выбор


export type StpData = Omit<StpItem, '_type'> & { id: number }
export type StpDataFull = StpItem & { id: number }
export type Order = 'asc' | 'desc';



export function StpDataTable() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof StpData>('depth');

    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(-1);
    const { StpStore, select, selectedItems, _type, setFcount } = useAppContext()
    const selectedTags = useTags(_type)
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
            const newSelectedAll = StpStore.table.map((n) => n.id);
            select(newSelectedAll)

            return;
        }
        select([])

    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
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
        if (selectedItems.length > 5) newSelected = newSelected.slice(1, 6)
        select(newSelected)
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

    const isSelected = (id: number) => selectedItems.indexOf(id) !== -1;
    const hasTags = (item: StpData) => selectedTags.length > 0
        ? selectedTags.every(t => item.tags.includes(t))
        : false

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0
        ? Math.max(0, (1 + page) * rowsPerPage - StpStore.table.length)
        : 0;

    const sorted = useSort(StpStore.table, order, orderBy, selectedTags)
    const visibleRows = React.useMemo(
        () => {
            const sliced = sorted.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage)
            return sliced
        },
        [order, orderBy, page, rowsPerPage, selectedTags],
    );
    React.useEffect(() => {
        setFcount(sorted.length)
    }, [sorted])
    return (
        <Box sx={ { width: '100%' } }>
            <Paper sx={ { width: '100%', mb: 2 } }>

                <StpTableToolbar numSelected={ selectedItems.length } />

                <TableContainer sx={ { overflowY: 'auto', maxHeight: '72vh', } } >
                    <Table
                        sx={ { minWidth: 750 } }
                        aria-labelledby="tableTitle"
                        size={ dense ? 'small' : 'medium' }
                        stickyHeader
                        padding='normal'
                    >
                        <EnhancedTableHead
                            numSelected={ selectedItems.length }
                            order={ order }
                            orderBy={ orderBy }
                            onSelectAllClick={ handleSelectAllClick }
                            onRequestSort={ handleRequestSort }
                            rowCount={ StpStore.table.length }
                        />


                        <TableBody>
                            {
                                visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(+row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    const isTagged = hasTags(row as unknown as StpData)
                                    return (
                                        <TableRow
                                            hover
                                            onClick={ (event) => handleClick(event, +row.id) }
                                            role="checkbox"
                                            aria-checked={ isItemSelected }
                                            tabIndex={ -1 }
                                            key={ row.id }
                                            selected={ isItemSelected }
                                            sx={ {
                                                cursor: 'pointer',
                                                bgcolor: isTagged ? '#d1e8f8' : '#ffffffDE'
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
                                                padding="normal"
                                                sx={ { minWidth: 'fit-content', textWrap: 'nowrap' } }
                                            >
                                                { row.name }
                                            </TableCell>
                                            <TableCell align="center">{ row.cams }</TableCell>
                                            <TableCell align="center">{ row.depth }</TableCell>
                                            <TableCell align="center">{ row.weight }</TableCell>
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
                        count={ StpStore.table.length }
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
