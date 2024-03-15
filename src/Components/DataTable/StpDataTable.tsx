import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import React, { Suspense, memo, useCallback, useState } from 'react';

import { Button, Stack, alpha } from '@mui/material';
import { useAppContext } from '../../Hooks/useStoresContext';
import { StpItem } from '../StpTable/TableObjects';
import { EnhancedTableHead, StpTableHeader } from './EnhancedTableHead';

import { StpTableToolbar } from './StpTableToolbar';
import { MdCompare } from 'react-icons/md';
import { MuiLink, MuiNavLink } from '../../Routes/Pages/MuiLink';
import { routePaths } from '../../Routes/routePath';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { _log } from '../../Helpers/helpersFns';
import { useCombineFilterSort } from '../../Hooks/useMemoFilter';
import { StpTableRow } from './StpTableRow';
import { SuspenseLoad } from '../UI/SuspenseLoad';




//__ Data Create*/
//TODO: добавить mobx
//TODO: ??? вынести выделение в action


export type StpData = StpItem & { id: number }
export type Order = 'asc' | 'desc';

export const isJson = (i: any) => JSON.parse(i) ? true : false


export const StpDataTable: React.FC<{ preload_data: StpData[] }> = ({ preload_data }) => {
    const { query, filterParams, } = useAppContext()
    const [selectedItems, select] = useState<number[]>([])
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof StpData>('depth');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [RPP, setRowsPerPage] = useState(-1);
    const sorted = useCombineFilterSort(preload_data, query, filterParams, order, orderBy) as unknown as StpData[]


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

    }, [select, selectedItems.length, sorted]);

    const handleClick = (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, id: number) => {

        const selectedIdx = selectedItems.indexOf(id);

        if (selectedIdx === -1) select(prev => [...prev, id])
        else if (selectedIdx >= 0 && selectedItems.length <= 5) select(prev => prev.filter(p => p !== id))
        if (selectedItems.length >= 5) select(prev => prev.filter(p => p !== id))

    };


    // const handleChangePage = (event: unknown, newPage: number) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = useCallback((id: number) => selectedItems.includes(id), [selectedItems]);
    const isFiltersOn = filterParams.cams?.length !== 0 || filterParams.depth?.length !== 0 || filterParams.tags?.length !== 0 || query !== ""


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page >= 0
        ? Math.max(0, (1 + page) * RPP - preload_data!.length)
        : 1;

    // const visibleRows = useMemo(
    //     () => {
    //         // console.log('loading: ', loading)
    //         const sliced = sorted.slice(
    //             page * RPP,
    //             page * RPP + RPP + 1)
    //         console.log('sliced', sliced)
    //         return sliced as unknown as StpData[]
    //     },
    //     [RPP, page, sorted]
    // );
    // useEffect(() => {
    //     // select(checkedCells)
    //     // return () => setCheckedCells([])
    // }, [checkedCells, select])



    console.count("RENDER!")
    return (

        <Box sx={ { width: '100%', height: '100%' } }>
            <Paper sx={ { mb: 2 } } elevation={ 2 }>

                <StpTableToolbar numFiltered={ sorted.length } />

                {/* <SuspenseLoad
                // fallback={ <div className='text-center'>Table is LOADING</div> }
                > */}
                <TableContainer sx={ {
                    overflowY: 'auto',
                    maxHeight: '70vh',
                    position: 'relative'
                } } >
                    <Table
                        stickyHeader
                        aria-labelledby="tableTitle"
                        size={ dense ? 'small' : 'medium' }
                        padding='normal'
                        sx={ {
                            minWidth: 750,
                        } }
                    >
                        <StpTableHeader
                            numSelected={ selectedItems.length }
                            rowCount={ sorted.length }
                            order={ order }
                            orderBy={ orderBy }
                            onSelectAllClick={ handleSelectAllClick }
                            onRequestSort={ handleRequestSort }
                        />


                        {/* <Suspense fallback={ <div className='text-center'>Table is LOADING</div> }> */ }
                        <TableBody>

                            {
                                sorted.map((row, index) =>
                                    <StpTableRow
                                        key={ row.name }
                                        row_number={ index }
                                        row_data={ row }
                                        handleClick={ handleClick }
                                        isSelected={ isSelected }
                                    />
                                ) }

                            {
                                emptyRows > 0 && (
                                    <TableRow
                                        style={ {
                                            height: 53 * emptyRows,
                                        } }
                                    >
                                        <TableCell colSpan={ 4 } />
                                    </TableRow>
                                )
                            }
                        </TableBody>
                        {/* </Suspense> */ }
                    </Table>



                </TableContainer>

                <Stack direction={ 'row' } maxHeight={ 55 } >



                    <Stack sx={ {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, .7),
                        justifyContent: 'space-between', color: 'whitesmoke'
                    } }
                        // component={ Paper } elevation={ 2 }
                        flexGrow={ 1 } direction={ 'row' } alignItems={ 'center' } px={ 2 }
                    >

                        {
                            //__FOOTER_________________
                        }
                        <Box
                            flexGrow={ 1 }
                            gap={ 2 }
                            component={ Stack }
                            flexDirection={ 'row' }
                            alignItems={ 'center' }
                            p={ 1 }
                        >
                            Выбрано для сравнения: { selectedItems.length } из { sorted.length }
                            <Button
                                color='info'
                                variant='text'
                                startIcon={ <MdCompare /> }
                                size='small'
                                sx={ {
                                    visibility: selectedItems.length > 0 ? 'visible' : 'hidden',
                                    margin: 'dense'
                                } }

                            >
                                <MuiNavLink to={ routePaths.compare } title={ 'Сравнить' } >Сравнить</MuiNavLink>
                            </Button>

                        </Box>
                        { isFiltersOn &&
                            <Box>
                                Совпадений найдено: { sorted.length }
                            </Box>
                        }
                        <FormControlLabel

                            control={ <Switch checked={ dense } onChange={ handleChangeDense } id='dense_checkbox' /> }
                            label="Уменьшить отступы"
                            sx={ { ml: 4, alignContent: 'center' } }
                        />
                    </Stack>

                </Stack>
                {/* </SuspenseLoad> */ }
            </Paper>
        </Box>

    );
}

StpDataTable.displayName = '____StpTable'
export const MemoStpTable = memo(({ preload_data }: { preload_data: StpData[] }) => StpDataTable({ preload_data }))



const DataError = () => {
    return (
        <div className='text-center text-xl text-red'>Table data error!!</div>
    )
}

