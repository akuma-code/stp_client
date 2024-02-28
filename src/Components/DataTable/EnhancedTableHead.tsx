import { TextField, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import * as React from 'react';
import { FaRegQuestionCircle } from "react-icons/fa";
import { _ID } from '../../Helpers/helpersFns';
import { _EnFieldsStp } from '../../Interfaces/Enums';
import { Order, StpData } from './StpDataTable';
interface HeadStpCell {
    label: string;
    id: keyof StpData;
    numeric: boolean;
    disablePadding: boolean;
    align?: 'left' | 'center' | 'right';
    desc?: string

}

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
    const notInfo = (headCell: HeadStpCell) => (headCell.id !== 'name' && headCell.id !== 'depth')
    const isFormula = (headCell: HeadStpCell) => headCell.id === 'name'
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
                {
                    stp_headCells.map((headCell) => (
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
                            <TableSortLabel sx={ { fontSize: 18 } }
                                active={ orderBy === headCell.id }
                                direction={ orderBy === headCell.id ? order : 'asc' }
                                onClick={ createSortHandler(headCell.id) }
                            >


                                <Tooltip
                                    title={ headCell.desc
                                        ? headCell.desc
                                        : headCell.label }
                                    PopperProps={ { placement: 'top', } }
                                >
                                    <Box display={ 'flex' } sx={ { mx: .5 } }>
                                        { notInfo(headCell) && <FaRegQuestionCircle className='text-blue-600' /> }
                                    </Box>
                                </Tooltip>
                                <Box>

                                    { headCell.label }
                                    { orderBy === headCell.id ? (
                                        <Box component="span"
                                            sx={ { ...visuallyHidden } }
                                        >
                                            { order === 'desc' ? 'sorted descending' : 'sorted ascending' }
                                        </Box>
                                    ) : null }
                                </Box>

                            </TableSortLabel>
                        </TableCell>
                    )) }
            </TableRow>
        </TableHead>
    );
}


const stp_headCells: readonly HeadStpCell[] = [
    {
        id: 'name',
        label: 'Формула',
        disablePadding: true,
        numeric: false,
        desc: "Формула стеклопакета",
        align: 'left'
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
        id: 'cams',
        label: _EnFieldsStp.cams,
        disablePadding: true,
        numeric: false,
        align: 'right',
        desc: "1 камера = 2 стекла, 2 камеры = 3 стекла"
    },
    {
        id: 'weight',
        label: 'Вес',
        disablePadding: true,
        numeric: true,
        align: 'right',
        desc: _EnFieldsStp.weight
    },
    {
        id: 'Ro',
        label: 'Ro',
        disablePadding: true,
        numeric: true,
        desc: _EnFieldsStp.Ro
    },
    {
        id: 'Det',
        label: 'Det',
        disablePadding: true,
        numeric: true,
        desc: _EnFieldsStp.Det
    },
    {
        id: 'Ea',
        label: 'Ea',
        disablePadding: true,
        numeric: true,
        desc: _EnFieldsStp.Ea
    },
    {
        id: 'Er',
        label: 'Er',
        disablePadding: true,
        numeric: true,
        desc: _EnFieldsStp.Er
    },
    {
        id: 'Lr',
        label: 'Lr',
        disablePadding: true,
        numeric: true,
        desc: _EnFieldsStp.Lr
    },
    {
        id: 'Lt',
        label: 'Lt',
        disablePadding: true,
        numeric: true,
        desc: _EnFieldsStp.Lt
    },
    {
        id: 'Ra',
        label: 'Ra',
        disablePadding: true,
        numeric: true,
        desc: _EnFieldsStp.Ra
    },

    {
        id: 'Rw',
        label: 'Rw',
        disablePadding: true,
        numeric: true,
        desc: _EnFieldsStp.Rw
    },
    {
        id: 'S',
        label: 'S',
        disablePadding: true,
        numeric: true,
        desc: _EnFieldsStp.S
    },
    {
        id: 'Sc',
        label: 'Sc',
        disablePadding: true,
        numeric: true,
        desc: _EnFieldsStp.Sc
    },
    {
        id: 'Sf',
        label: 'Sf',
        disablePadding: true,
        numeric: true,
        desc: _EnFieldsStp.Sf
    },
    {
        id: 'secure',
        label: 'Secure',
        disablePadding: true,
        numeric: false,
        align: 'right',
        desc: "Класс безопасности"
    },

];