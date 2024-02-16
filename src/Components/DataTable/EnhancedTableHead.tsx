import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { _ID } from '../../Helpers/helpersFns';
import { _EnFieldsStp } from '../../Interfaces/Enums';
import { Order, StpData } from './StpDataTable';
import { Tooltip } from '@mui/material';

interface HeadStpCell {
    label: string;
    id: keyof StpData;
    numeric: boolean;
    disablePadding: boolean;
    align?: 'left' | 'center' | 'right';
    desc?: string

}
const stp_headCells: readonly HeadStpCell[] = [
    {
        id: 'name',
        label: 'Формула',
        disablePadding: false,
        numeric: false
    },
    {
        id: 'cams',
        label: _EnFieldsStp.cams,
        disablePadding: true,
        numeric: false,
        align: 'center'
    },
    {
        id: 'depth',
        label: _EnFieldsStp.depth,
        disablePadding: true,
        numeric: false,
        align: 'center',
        desc: 'Толщина стеклопакета, мм'
    },
    {
        id: 'Ro',
        label: 'Ro',
        disablePadding: false,
        numeric: true,
        desc: _EnFieldsStp.Ro
    },
    {
        id: 'Det',
        label: 'Det',
        disablePadding: false,
        numeric: true,
        desc: _EnFieldsStp.DET
    },
    {
        id: 'Ea',
        label: 'Ea',
        disablePadding: false,
        numeric: true,
        desc: _EnFieldsStp.EA
    },
    {
        id: 'Er',
        label: 'Er',
        disablePadding: false,
        numeric: true,
        desc: _EnFieldsStp.ER
    },
    {
        id: 'Lr',
        label: 'Lr',
        disablePadding: false,
        numeric: true,
        desc: _EnFieldsStp.LR
    },
    {
        id: 'Lt',
        label: 'Lt',
        disablePadding: false,
        numeric: true,
        desc: _EnFieldsStp.LT
    },
    {
        id: 'Ra',
        label: 'Ra',
        disablePadding: false,
        numeric: true,
        desc: _EnFieldsStp.Ra
    },

    {
        id: 'Rw',
        label: 'Rw',
        disablePadding: false,
        numeric: true,
        desc: _EnFieldsStp.Rw
    },
    {
        id: 'S',
        label: 'S',
        disablePadding: false,
        numeric: true,
        desc: _EnFieldsStp.S
    },
    {
        id: 'Sc',
        label: 'Sc',
        disablePadding: false,
        numeric: true,
        desc: _EnFieldsStp.SC
    },
    {
        id: 'Sf',
        label: 'Sf',
        disablePadding: false,
        numeric: true,
        desc: _EnFieldsStp.SF
    },
    {
        id: 'secure',
        label: 'Secure',
        disablePadding: false,
        numeric: false,
        align: 'center',
        desc: "Класс безопасности"
    },
    // {
    //     id: '_type',
    //     label: 'Формула',
    //     disablePadding: false,
    //     numeric: false
    // },
];
interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof StpData) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}
export function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof StpData) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" sx={ { borderBottom: '1px solid black', bgcolor: '#93d4ff' } }>
                    <Checkbox
                        color="primary"
                        indeterminate={ numSelected > 0 && numSelected < rowCount }
                        checked={ rowCount > 0 && numSelected === rowCount }
                        onChange={ onSelectAllClick }

                        id='selected_id' />
                </TableCell>
                { stp_headCells.map((headCell) => (
                    <TableCell
                        key={ _ID() }
                        align={ headCell.align ? headCell.align
                            : headCell.numeric
                                ? 'right'
                                : 'left' }
                        padding={ headCell.disablePadding ? 'none' : 'normal' }
                        sortDirection={ orderBy === headCell.id ? order : false }
                        sx={ { borderBottom: '1px solid black', height: 70, bgcolor: '#93d4ff' } }
                    >
                        <Tooltip
                            title={ headCell.desc ? headCell.desc : headCell.label }
                            PopperProps={ { placement: 'top' } }

                        >
                            <TableSortLabel
                                active={ orderBy === headCell.id }
                                direction={ orderBy === headCell.id ? order : 'asc' }
                                onClick={ createSortHandler(headCell.id) }
                            >

                                { headCell.label }
                                { orderBy === headCell.id ? (
                                    <Box component="span"
                                        sx={ visuallyHidden }
                                    >
                                        { order === 'desc' ? 'sorted descending' : 'sorted ascending' }
                                    </Box>
                                ) : null }
                            </TableSortLabel>
                        </Tooltip>
                    </TableCell>
                )) }
            </TableRow>
        </TableHead>
    );
}
