import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import React, { memo, useCallback, useMemo, useState } from 'react';

import { Stack, alpha } from '@mui/material';
import { StpItem } from '../StpTable/TableObjects';
import { StpTableHeader } from './EnhancedTableHead';

import { StpTableToolbar } from './StpTableToolbar';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { observer } from 'mobx-react-lite';
import { useCompare } from '../../Hooks/useCompare';
import { useFilterContext } from '../../Hooks/useFilterContext';
import { SelectorActions } from '../../Hooks/useIdSelector';
import StpTableRow from './StpTableRow';




//__ Data Create*/
//TODO: добавить mobx
//TODO: ??? вынести выделение в action


export type StpData = StpItem & { id: number }
export type Order = 'asc' | 'desc';

export type StpViewOptions = {
    order: Order
    orderBy: keyof StpData
    dense: boolean
    RPP: number
}

type StpTableProps = {
    items: StpData[]
    selectedItems?: number[]
    selectorActions?: SelectorActions
}

export const StpDataTable: React.FC<StpTableProps> = observer(({ items, selectedItems }) => {
    // const { filterParams, select: s } = useAppContext()
    const { filters } = useFilterContext();

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof StpData>('depth');
    const sorted = useCompare(items, order, orderBy)
    // console.time('renderTime:')
    // const [selectedItems, select] = useState<number[]>([])
    // const [page, setPage] = useState(1);
    // const [dense, setDense] = useState(true);
    // const [RPP, setRowsPerPage] = useState(-1);
    // const sorted = useCombineFilterSort(items, query, filterParams, order, orderBy) as unknown as StpData[]

    const handleRequestSort = useCallback((
        event: React.MouseEvent<unknown>,
        property: keyof StpData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }, [order, orderBy]);

    const handleSelectAllClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked && filters.ids.length >= 5) {
            filters.clearFilter('ids')
            // clear()
            return
        }
        if (!event.target.checked) {
            const newSelectedAll = sorted.map((n) => +n.id);
            filters.selectId(newSelectedAll)
            // select(newSelectedAll)
            return;
        }
        filters.clearFilter('ids')
        // clear()

    }, [filters, sorted]);


    const handleClick = useCallback((id: number) => {
        // if (filters.ids.length >= 5) return
        filters.selectId(id)



    }, [filters]);
    //     const handleClick = useCallback((event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, id: number) => {
    // if(filters.ids.length>=5) return
    // filters.selectId(id)


    //         const selectedIdx = selectedItems.indexOf(id);

    //         if (selectedIdx === -1) select(id)
    //         else if (selectedIdx >= 0 && selectedItems.length <= 5) remove(id)
    //         if (selectedItems.length >= 5) remove(id)
    //     }, [remove, select, selectedItems]);


    // useEffect(() => {
    //     s(selectedItems)

    // }, [s, selectedItems])
    const isFiltersOn = filters.depth?.length !== 0 || filters.tags?.length !== 0
    // const handleChangePage = (event: unknown, newPage: number) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setDense(event.target.checked);
    // };

    // const isSelected = useCallback((id: number) => selectedItems.includes(id), [selectedItems]);


    // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows = page >= 0
    //     ? Math.max(0, (1 + page) * RPP - items!.length)
    //     : 1;

    // const visibleRows = useMemo(
    //     () => {
    //         // console.log('loading: ', loading)
    //         const sliced = items.slice(
    //             page * RPP,
    //             page * RPP + RPP + 1)
    //         // console.log('sliced', sliced)

    //         return sliced as unknown as StpData[]
    //     },
    //     [RPP, items, page]
    // );

    // console.log('%cRender', 'color: red; background-color: beige; font-size: 1.5em')
    const RowsList = useMemo(() => {
        const handleClick = (id: number) => {
            if (filters.ids.length === filters.options.selectMax) { return false }
            filters.selectId(id)
            return filters.ids.includes(+id)
        }

        const list = () => sorted.map((row, index) =>
            <StpTableRow
                key={ row.name }
                row_number={ index }
                row_data={ row as unknown as StpData }
                handleClick={ handleClick }
                isSelected={ filters.ids.includes(+row.id) }

            />
        )
        return list
    }, [filters, sorted])
    return (

        <Box sx={ { width: '100%', height: '100%' } }>
            <Paper sx={ { m: 1 } } elevation={ 2 }>


                <StpTableToolbar numFiltered={ sorted.length } />

                <TableContainer sx={ {
                    overflowY: 'auto',
                    maxHeight: '70vh',
                    position: 'relative'


                } } >
                    <Table
                        stickyHeader
                        aria-labelledby="tableTitle"
                        size={ 'small' }
                        padding='normal'
                        sx={ {
                            minWidth: 750,

                        } }
                    >
                        <StpTableHeader
                            numSelected={ filters.ids.length }
                            rowCount={ sorted.length }
                            order={ order }
                            orderBy={ orderBy }
                            onSelectAllClick={ handleSelectAllClick }
                            onRequestSort={ handleRequestSort }
                        />



                        <TableBody>
                            <RowsList />


                        </TableBody>
                    </Table>
                </TableContainer>


                <StpTableFooter
                    dense={ true }
                    NumSelected={ filters.ids.length }
                    NumFiltered={ sorted.length }
                    isFiltersOn={ isFiltersOn }
                />

            </Paper>
        </Box>

    );
})

StpDataTable.displayName = '____StpTable'
export const MemoStpTable = memo((props: StpTableProps) => StpDataTable(props))
MemoStpTable.displayName = "___MemoizedDataTable"


function EmptyRowsPlaceholder(props: { emptyRows: number }): React.ReactNode {
    return props.emptyRows > 0 && (
        <TableRow
            style={ {
                height: 53 * props.emptyRows,
            } }
        >
            <TableCell colSpan={ 4 } />
        </TableRow>
    );
}

function StpTableFooter(props: {
    NumSelected: number,
    NumFiltered: number,
    isFiltersOn: boolean,
    dense?: boolean,
    page?: number,
    rows_per_page?: number,
    handleChangePage?: (event: unknown, newPage: number) => void
    handleChangeRowsPerPage?: (event: React.ChangeEvent<HTMLInputElement>) => void
    toggleDense?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
    const { NumFiltered, NumSelected, isFiltersOn, ...rest } = props
    // const handleChangePage = (event: unknown, newPage: number) => {
    //         setPage(newPage);
    //     };

    //     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //         setRowsPerPage(parseInt(event.target.value, 10));
    //         setPage(0);
    //     };
    return (
        <Stack sx={ {
            bgcolor: (theme) => alpha(theme.palette.primary.main, .7),
            color: 'whitesmoke',
            justifyContent: 'space-between',
        } }
            flexGrow={ 1 } direction={ 'row' } alignItems={ 'center' } px={ 2 }
        >
            <Box
                flexGrow={ 1 }
                gap={ 2 }
                component={ Stack }
                flexDirection={ 'row' }
                alignItems={ 'center' }
                p={ 1 }
            >
                Выбрано для сравнения: { NumSelected } из { NumFiltered }
                {/* <Button
                    color='info'
                    variant='contained'
                    startIcon={ <MdCompare /> }
                    size='small'
                    sx={ {
                        visibility: NumSelected > 0 ? 'visible' : 'hidden',
                        margin: 'dense'
                    } }

                >
                    <MuiNavLink to={ routePaths.compare } title={ 'Сравнить выбранные стеклопакеты' }>Сравнить</MuiNavLink>
                </Button> */}

            </Box>
            { isFiltersOn && ` Совпадений найдено: ${NumFiltered}` }

        </Stack>
    )
}

