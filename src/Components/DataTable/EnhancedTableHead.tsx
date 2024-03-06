import { SvgIcon, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import * as React from 'react';
import { FaRegQuestionCircle } from "react-icons/fa";
import { _EnFieldsStp } from '../../Interfaces/Enums';
import { HelperDialog } from '../UI/HelperDialog';
import { Order, StpData } from './StpDataTable';
interface HeadStpCell {
    label: string;
    id: keyof StpData;
    numeric: boolean;
    disablePadding: boolean;
    align?: 'left' | 'center' | 'right';
    desc?: string,
    colSpan?: number

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
    const notInfo = (headCell: HeadStpCell) => (headCell.id !== 'name' && headCell.id !== 'depth' && headCell.id !== 'tags')
    const isFormula = (headCell: HeadStpCell) => headCell.id === 'name' || headCell.id === 'tags'
    const hasImage = (headCell: HeadStpCell) => ['Lt', 'Lr', 'Det', 'Sf', 'Er,', 'Ea', 'Er', 'Rw'].includes(headCell.id)
    const getImgName = (cellId: keyof StpData) => {

        const img_id = {
            light: ['Lt', 'Lr'],
            energy: ['Er', 'Ea', 'Det', 'Sf'],
            decibel: ['Rw']
        }
        if (img_id.light.includes(cellId)) return 'light'
        if (img_id.energy.includes(cellId)) return 'energy'
        if (img_id.decibel.includes(cellId)) return 'decibel'
        return ""

    }
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" sx={ { borderBottom: '1px solid black', bgcolor: '#93d4ff' } }>
                    <Checkbox
                        color="primary"
                        indeterminate={ numSelected > 0 && numSelected < rowCount }
                        checked={ rowCount > 0 && numSelected === rowCount }
                        onChange={ onSelectAllClick }
                        aria-labelledby='selected_id'
                        id='selected_id' />
                </TableCell>
                {
                    stp_headCells.map((headCell) => (
                        <TableCell
                            colSpan={ headCell.colSpan ? headCell.colSpan : 1 }
                            key={ headCell.id }
                            align={ headCell.align
                                ? headCell.align
                                : headCell.numeric
                                    ? 'right'
                                    : 'center'
                            }
                            padding={ headCell.disablePadding ? 'none' : 'normal' }
                            sortDirection={ orderBy === headCell.id ? order : false }
                            sx={ {
                                borderBottom: '1px solid black', height: 60, bgcolor: '#93d4ff',

                                width: 10
                            } }
                            id={ headCell.id }
                        >
                            <TableSortLabel sx={ {
                                fontSize: 18,
                                maxWidth: 150,
                                // width: 10


                            } }
                                active={ orderBy === headCell.id }
                                direction={ orderBy === headCell.id ? order : 'asc' }
                                onClick={ createSortHandler(headCell.id) }

                            >

                                {
                                    hasImage(headCell) ?


                                        <HelperDialog img_name={ getImgName(headCell.id) } tooltip_title={ headCell.desc || "" } />
                                        :
                                        <Tooltip
                                            title={ headCell.desc
                                                ? headCell.desc
                                                : headCell.label }
                                            PopperProps={ { placement: 'top', } }
                                        >
                                            <Box

                                            >
                                                { !isFormula(headCell) &&

                                                    <SvgIcon sx={ { maxHeight: 15 } } >
                                                        <FaRegQuestionCircle className={ hasImage(headCell) ? 'text-orange-800' : 'text-blue-600' } />
                                                    </SvgIcon>
                                                }

                                            </Box>
                                        </Tooltip>
                                }

                                <Box alignItems={ 'baseline' }>


                                    { headCell.label }
                                    { orderBy === headCell.id ? (
                                        <Box component="span"
                                            sx={ { ...visuallyHidden } }
                                        >
                                            { order === 'desc' ? 'sorted descending' : 'sorted ascending' }
                                        </Box>
                                    ) : null
                                    }
                                    {

                                    }
                                </Box>

                            </TableSortLabel>
                        </TableCell>
                    )) }
            </TableRow>
        </TableHead>
    );
}


const PicModal = () => {

}

const stp_headCells: readonly HeadStpCell[] = [
    {
        id: 'name',
        label: 'Формула',
        disablePadding: false,
        numeric: false,
        desc: "Формула стеклопакета",
        align: 'center',
        colSpan: 1
    },
    {
        id: 'tags',
        label: 'Тэги',
        disablePadding: true,
        numeric: true,
        align: 'center',
        desc: "Тэги"
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
        align: 'center',
        desc: "1 камера = 2 стекла, 2 камеры = 3 стекла"
    },
    {
        id: 'weight',
        label: 'Вес',
        disablePadding: true,
        numeric: true,
        align: 'center',
        desc: _EnFieldsStp.weight
    },
    {
        id: 'Ro',
        label: 'Ro',
        disablePadding: true,
        numeric: true,
        align: 'center',
        desc: _EnFieldsStp.Ro
    },
    {
        id: 'Det',
        label: 'Det',
        disablePadding: true,
        numeric: true,
        align: 'center',
        desc: _EnFieldsStp.Det
    },
    {
        id: 'Ea',
        label: 'Ea',
        disablePadding: true,
        numeric: true,
        align: 'center',
        desc: _EnFieldsStp.Ea
    },
    {
        id: 'Er',
        label: 'Er',
        disablePadding: true,
        numeric: true,
        align: 'center',
        desc: _EnFieldsStp.Er
    },
    {
        id: 'Lr',
        label: 'Lr',
        disablePadding: true,
        numeric: true,
        align: 'center',
        desc: _EnFieldsStp.Lr
    },
    {
        id: 'Lt',
        label: 'Lt',
        disablePadding: true,
        numeric: true,
        align: 'center',
        desc: _EnFieldsStp.Lt
    },
    {
        id: 'Ra',
        label: 'Ra',
        disablePadding: true,
        numeric: true,
        align: 'center',
        desc: _EnFieldsStp.Ra
    },

    {
        id: 'Rw',
        label: 'Rw',
        disablePadding: true,
        numeric: true,
        align: 'center',
        desc: _EnFieldsStp.Rw
    },
    {
        id: 'S',
        label: 'S',
        disablePadding: true,
        numeric: true,
        align: 'center',
        desc: _EnFieldsStp.S
    },
    // {
    //     id: 'Sc',
    //     label: 'Sc',
    //     disablePadding: true,
    //     numeric: true,
    //     desc: _EnFieldsStp.Sc
    // },
    {
        id: 'Sf',
        label: 'Sf',
        disablePadding: true,
        numeric: true,
        align: 'center',
        desc: _EnFieldsStp.Sf
    },
    {
        id: 'secure',
        label: 'Secure',
        disablePadding: true,
        numeric: true,
        align: 'center',
        desc: "Класс безопасности"
    },


];