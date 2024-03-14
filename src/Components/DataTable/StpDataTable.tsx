import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import React, { Suspense, memo, useCallback, useEffect, useState } from 'react';

import { Button, Stack, alpha } from '@mui/material';
import { useCompare, useStpFilter } from '../../Hooks/useCompare';
import { useAppContext } from '../../Hooks/useStoresContext';
import { StpItem, StpTag } from '../StpTable/TableObjects';
import { EnhancedTableHead } from './EnhancedTableHead';

import { StpTableToolbar } from './StpTableToolbar';
import { TagsAvatarGroup } from '../UI/TagAvatars';
import { MdCompare } from 'react-icons/md';
import { MuiLink } from '../../Routes/Pages/MuiLink';
import { routePaths } from '../../Routes/routePath';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { _log } from '../../Helpers/helpersFns';
import { AvatarS2, AvatarS3 } from '../UI/CamsAvatars';
import { FormulaTTButton } from '../UI/FormulaTooltip';




//__ Data Create*/
//TODO: добавить mobx
//TODO: вынести ряд в отдельный компонент
//TODO: ??? вынести выделение в action


export type StpData = StpItem & { id: number }
export type Order = 'asc' | 'desc';

export const isJson = (i: any) => JSON.parse(i) ? true : false

const cells: (keyof StpData)[] = [
    'depth',
    'weight',
    'Ro',
    'Det',
    'Ea',
    'Er',
    'Lr',
    'Lt',
    'Ra',
    'Rw',
    'S',
    'Sf',
    'secure',
] as const
export const StpDataTable: React.FC<{ preload_data: StpData[] }> = memo(({ preload_data }) => {
    const { select, query, filterParams, selectedItems } = useAppContext()

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof StpData>('depth');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [RPP, setRowsPerPage] = useState(-1);
    // const submit = useSubmit()
    // const fetcher = useFetcher()
    // const [checkedCells, setCheckedCells] = useState<number[]>([])
    // const memodata = preload_data ?? []


    const filtered = useStpFilter(preload_data, query, filterParams)
    const sorted = useCompare(filtered, order, orderBy)


    // const submitSelected = () => {
    //     const data = JSON.stringify(selectedItems)
    //     fetcher.submit(selectedItems, {
    //         method: 'POST',
    //         action: routePaths.compare,
    //         encType: 'application/x-www-form-urlencoded'
    //     })
    //     _log('submited: ', data)
    // }

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

    const handleClick = useCallback((event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, id: number) => {

        const selectedIdx = selectedItems.indexOf(id);

        if (selectedIdx === -1) select(prev => [...prev, id])
        else if (selectedIdx >= 0 && selectedItems.length <= 5) select(prev => prev.filter(p => p !== id))
        if (selectedItems.length >= 5) select(prev => prev.filter(p => p !== id))

    }, [selectedItems, select]);


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

    const isSelected = useCallback((id: number) => selectedItems.indexOf(id) !== -1, [selectedItems]);
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
    // console.count("RENDER!")

    console.count("table rendered")
    return (

        <Box sx={ { width: '100%', height: '100%' } }>
            <Paper sx={ { mb: 2 } } elevation={ 2 }>

                <StpTableToolbar numSelected={ selectedItems.length } numFiltered={ sorted.length } />

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
                        <EnhancedTableHead
                            numSelected={ selectedItems.length }
                            rowCount={ sorted.length }
                            order={ order }
                            orderBy={ orderBy }
                            onSelectAllClick={ handleSelectAllClick }
                            onRequestSort={ handleRequestSort }
                        />


                        <Suspense fallback={ <div className='text-center'>LOADING</div> }>
                            <TableBody>
                                {
                                    sorted.map((row, index) => {
                                        const isItemSelected = isSelected(+row.id);
                                        const labelId = `enhanced-table-${index}`;

                                        // const isTagged = hasTags(row as unknown as StpData)
                                        return (
                                            <TableRow
                                                hover
                                                key={ row.id }
                                                // onClick={ (event) => handleClick(event, +row.id) }
                                                role="checkbox"
                                                aria-checked={ isItemSelected }
                                                tabIndex={ -1 }
                                                selected={ isItemSelected }

                                            >
                                                <TableCell
                                                    padding="checkbox"
                                                    onClick={ (event) => handleClick(event, +row.id) } sx={ { cursor: 'pointer', } }>
                                                    <Box component={ Stack }
                                                        direction={ 'row' }
                                                        alignItems={ 'center' }
                                                        spacing={ 0 }
                                                        gap={ 0 }
                                                        justifyContent={ 'space-between' }>

                                                        { `${index + 1}.` }
                                                        <Checkbox
                                                            color="primary"
                                                            checked={ isItemSelected }
                                                            inputProps={ {
                                                                'aria-labelledby': labelId,
                                                            } }
                                                            id={ labelId }
                                                        />
                                                    </Box>
                                                </TableCell>
                                                <TableCell
                                                    // onClick={ (event) => handleClick(event, +row.id) }
                                                    component="th"
                                                    id={ labelId }
                                                    scope="row"
                                                    padding="none"
                                                    sx={ {
                                                        textWrap: 'nowrap',
                                                        // cursor: 'pointer',
                                                        [`& :hover>.MuiIconButton-root `]: { visibility: 'visible' },
                                                        [`& .MuiIconButton-root`]: { visibility: 'hidden' },
                                                    } }
                                                    colSpan={ 1 }
                                                >
                                                    <Box component={ Stack } direction={ 'row' } justifyContent={ 'space-between' } alignItems={ 'center' }>

                                                        { row.name }
                                                        <FormulaTTButton
                                                            stp_name={ row.name as string }
                                                        />
                                                    </Box>
                                                </TableCell>
                                                <TableCell align='right'>
                                                    <TagsAvatarGroup tags={ row.tags as unknown as StpTag[] }
                                                    // handleTagsClick={ (t) => filterFn(prev => ({ ...prev, tags: [...prev.tags!, t] })) }
                                                    />
                                                </TableCell>
                                                <TableCell align='center' sx={ { display: 'flex', justifyContent: 'center' } }>
                                                    { row.cams === 1 && <AvatarS2 wh={ 34 } /> }
                                                    { row.cams === 2 && <AvatarS3 wh={ 34 } /> }
                                                    {/* <strong>{ row.cams } </strong> */ }
                                                </TableCell>

                                                {
                                                    cells.map(cell =>

                                                        <TableCell align="center" key={ cell }>{ row[cell] }</TableCell>
                                                    )
                                                }

                                            </TableRow>
                                        );
                                    }) }
                                { emptyRows > 0 && (
                                    <TableRow
                                        style={ {
                                            height: 53 * emptyRows,
                                        } }
                                    >
                                        <TableCell colSpan={ 4 } />
                                    </TableRow>
                                ) }
                            </TableBody>
                        </Suspense>

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
                                variant='contained'
                                startIcon={ <MdCompare /> }
                                size='small'
                                sx={ {
                                    visibility: selectedItems.length > 0 ? 'visible' : 'hidden',
                                    margin: 'dense'
                                } }

                            >
                                <MuiLink to={ routePaths.compare } title={ 'Сравнить' } >Сравнить</MuiLink>
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
            </Paper>
        </Box>

    );
})

StpDataTable.displayName = '____StpTable'

const DataError = () => {
    return (
        <div className='text-center text-xl text-red'>Table data error!!</div>
    )
}

/* <TablePagination
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
                   /> */