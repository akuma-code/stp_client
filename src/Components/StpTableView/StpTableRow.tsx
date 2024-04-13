import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { useToggle } from '../../Hooks/useToggle';
import { StpTag } from '../StpTable/TableObjects';
import { AvatarS2, AvatarS3 } from '../UI/CamsAvatars';
import { FormulaTTButton } from '../UI/FormulaTooltip';
import { TagsAvatarGroup } from '../UI/TagAvatars';
import { StpData, } from './StpDataTable';

export const stpFields: (keyof StpData)[] = [
    'depth',
    'weight',
    'Ro',
    'Rw',
    'Det',
    'Ea',
    'Er',
    'Lr',
    'Lt',
    'Ra',
    'S',
    'Sf',
    'secure',
] as const
export type StpRowProps = {
    row_data: StpData;
    row_number: number;
    handleClick?: (id: number) => boolean;
    isSelected?: boolean
};


function NameCell(props: { name: string }) {
    return (<Box component={ Stack } direction={ 'row' } justifyContent={ 'space-between' } alignItems={ 'center' }>

        { props.name }
        <FormulaTTButton stp_name={ (props.name as string) } />
    </Box>);
}

const endSign = (key: keyof StpData) => key === 'weight' ? ' кг/кв.м' : key === 'depth' ? ' мм' : ""

export const StpTableRow: React.FC<StpRowProps> = observer(({ row_number, row_data, handleClick, isSelected }) => {
    const [_selected, { off, on }] = useToggle(isSelected || false);



    const numericData = useCallback((key: keyof StpData) => row_data[key], [row_data])
    const clickCell = useCallback((e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
        if (handleClick) {
            handleClick(row_data.id) ? on() : off()
        }

    }, [off, on, row_data.id, handleClick])
    useEffect(() => {
        isSelected === false && off()
    }, [isSelected])
    return (


        <TableRow
            hover
            key={ row_data.id }
            role="checkbox"
            // aria-checked={ _selected }
            tabIndex={ -1 }
            selected={ _selected }

        >

            <TableCell
                padding="checkbox"
                onClick={ clickCell }
                sx={ { cursor: 'pointer', } }
            >
                <Box component={ Stack }
                    direction={ 'row' }
                    alignItems={ 'center' }
                    spacing={ 0 }
                    gap={ 0 }
                    justifyContent={ 'space-between' }>

                    { `${row_number + 1}.` }
                    <Checkbox
                        color="primary"
                        checked={ _selected }
                        inputProps={ {
                            'aria-labelledby': `enhanced-table-${row_number}-check`,
                        } }
                        id={ `enhanced-table-${row_number}-check` } />
                </Box>
            </TableCell>

            <TableCell
                component="th"
                id={ `enhanced-table-${row_number}-name` }
                scope="row"
                padding="none"
                sx={ {
                    textWrap: 'nowrap',
                    [`& :hover>.MuiIconButton-root `]: { visibility: 'visible' },
                    [`& .MuiIconButton-root`]: { visibility: 'hidden' },
                } }

            >

                <NameCell name={ row_data.name } />
            </TableCell>
            <TableCell align='right'>
                <TagsAvatarGroup tags={ row_data.tags as unknown as StpTag[] } />
            </TableCell>
            <TableCell align='center' sx={ { display: 'flex', justifyContent: 'center' } }>
                {
                    row_data.cams === 1
                        ? <AvatarS2 wh={ 34 } />
                        : row_data.cams === 2
                            ? <AvatarS3 wh={ 34 } />
                            : null
                }
            </TableCell>
            {/* <MemedCells cell={ row_data } /> */ }
            {
                // NumericCells
            }
            <React.Fragment>

                {
                    stpFields.map(cell =>


                        <DataCell key={ cell }
                            primary={ numericData(cell) }
                            secondary={ endSign(cell) }
                            cellProps={ { align: 'right' } }
                        />
                    ) }
            </React.Fragment>



        </TableRow>
    )
})


StpTableRow.displayName = '__Row_StpData'

type DataCellProps = {
    primary: React.ReactNode
    secondary?: React.ReactNode
    action?: (...args: any) => void
    cellProps?: TableCellProps
}

export const DataCell: React.FC<DataCellProps> = ({ primary, secondary, action, cellProps }) => {

    const handleClick = () => {
        action && action()
    }
    return (
        <TableCell onClick={ handleClick } align={ cellProps?.align ? cellProps.align : 'right' } >
            <Stack direction={ 'row' } justifyContent={ 'space-between' }>

                { primary }
                { secondary ? secondary : null }
            </Stack>
        </TableCell>)
}

export default React.memo(StpTableRow)