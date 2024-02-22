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
import { MdInfoOutline } from "react-icons/md";

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
        disablePadding: true,
        numeric: false,
        desc: "Формула стеклопакета"
    },
    {
        id: 'cams',
        label: _EnFieldsStp.cams,
        disablePadding: false,
        numeric: false,
        align: 'center',
        desc: "1 камера = 2 стекла, 2 камеры = 3 стекла"
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
        id: 'weight',
        label: 'Вес',
        disablePadding: true,
        numeric: true,
        align: 'right',
        desc: _EnFieldsStp.Weight
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
        align: 'right',
        desc: "Класс безопасности"
    },

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
    const notInfo = (headCell: HeadStpCell) => (headCell.id !== 'name' && headCell.id !== 'cams' && headCell.id !== 'depth')
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
                        align={ headCell.align
                            ? headCell.align
                            : headCell.numeric
                                ? 'right'
                                : 'left' }
                        padding={ headCell.disablePadding ? 'none' : 'normal' }
                        sortDirection={ orderBy === headCell.id ? order : false }
                        sx={ {
                            borderBottom: '1px solid black', height: 60, bgcolor: '#93d4ff',

                        } }
                    >
                        <Tooltip
                            title={ headCell.desc
                                ? headCell.desc
                                : headCell.label }
                            PopperProps={ { placement: 'top', } }
                            sx={ { fontSize: 18 } }

                        >
                            <TableSortLabel
                                active={ orderBy === headCell.id }
                                direction={ orderBy === headCell.id ? order : 'asc' }
                                onClick={ createSortHandler(headCell.id) }
                            >
                                <Box display={ 'flex' } gap={ .5 }>

                                    { headCell.label }
                                    { notInfo(headCell) && <MdInfoOutline className='text-blue-600' /> }
                                </Box>
                                { orderBy === headCell.id ? (
                                    <Box component="span"
                                        sx={ { ...visuallyHidden } }
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
