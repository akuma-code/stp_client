import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { useCallback, useMemo } from 'react';
import { Stack } from '@mui/material';
import { StpItem, StpTag } from '../StpTable/TableObjects';
import { TagsAvatarGroup } from '../UI/TagAvatars';
import { AvatarS2, AvatarS3 } from '../UI/CamsAvatars';
import { FormulaTTButton } from '../UI/FormulaTooltip';
import { StpData, } from './StpDataTable';
import { SuspenseLoad } from '../UI/SuspenseLoad';

export const stpFields: (keyof StpData)[] = [
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
export type StpRowProps = {
    row_data: StpData;
    row_number: number;
    // isSelected: (id: number) => boolean;
    handleClick: (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, id: number) => void;
    isSelected: boolean
};

export const StpTableRow: React.FC<StpRowProps> = React.memo(({ handleClick, row_number, row_data, isSelected = false }) => {
    const numericData = useCallback((key: keyof StpData) => row_data[key], [row_data])
    // const selectedRow = isSelected(row_data.id)

    const NumericCells = useMemo(() => {

        const cells = stpFields.map(cell => <TableCell align="center" key={ cell }>{ numericData(cell) }</TableCell>)
        return cells
    }, [numericData])
    return (


        <TableRow
            hover
            key={ row_data.id }
            // onClick={ (event) => handleClick(event, +row_data.id) }
            role="checkbox"
            aria-checked={ isSelected }
            tabIndex={ -1 }
            selected={ isSelected }

        >

            <TableCell
                padding="checkbox"
                onClick={ (event) => handleClick(event, row_data.id) }
                sx={ { cursor: 'pointer', } }>
                <Box component={ Stack }
                    direction={ 'row' }
                    alignItems={ 'center' }
                    spacing={ 0 }
                    gap={ 0 }
                    justifyContent={ 'space-between' }>

                    { `${row_number + 1}.` }
                    <Checkbox
                        color="primary"
                        checked={ isSelected }
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
                <Box component={ Stack } direction={ 'row' } justifyContent={ 'space-between' } alignItems={ 'center' }>

                    { row_data.name }
                    <FormulaTTButton stp_name={ row_data.name as string } />
                </Box>
            </TableCell>
            <TableCell align='right'>
                <TagsAvatarGroup tags={ row_data.tags as unknown as StpTag[] } />
            </TableCell>
            <TableCell align='center' sx={ { display: 'flex', justifyContent: 'center' } }>
                { row_data.cams === 1 && <AvatarS2 wh={ 34 } /> }
                { row_data.cams === 2 && <AvatarS3 wh={ 34 } /> }
                {/* <strong>{ row_data.cams } </strong> */ }
            </TableCell>

            { NumericCells }
            {
                // stpFields.map(cell =>
                // <TableCell align="center" key={ cell }>{ row_data[cell] }</TableCell>

                // ) 
            }


        </TableRow>
    )
})



StpTableRow.displayName = '__Row_StpData'