import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { useCallback, useMemo } from 'react';
import { Stack } from '@mui/material';
import { StpItem, StpTag } from '../StpTable/TableObjects';
import { TagsAvatarGroup } from '../UI/TagAvatars';
import { AvatarS2, AvatarS3 } from '../UI/CamsAvatars';
import { FormulaTTButton } from '../UI/FormulaTooltip';
import { StpData, } from './StpDataTable';
import { SuspenseLoad } from '../UI/SuspenseLoad';
import { _ID } from '../../Helpers/helpersFns';

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


function NameCell(props: { name: string }) {
    return (<Box component={ Stack } direction={ 'row' } justifyContent={ 'space-between' } alignItems={ 'center' }>

        { props.name }
        <FormulaTTButton stp_name={ (props.name as string) } />
    </Box>);
}


export const StpTableRow: React.FC<StpRowProps> = ({ handleClick, row_number, row_data, isSelected = false }) => {


    const endSign = useCallback((key: keyof StpData) => key === 'weight' ? ' кг/кв.м' : key === 'depth' ? ' мм' : "", [])
    const numericData = useCallback((key: keyof StpData) => row_data[key], [row_data])
    // const selectedRow = isSelected(row_data.id)
    const clickCell = useCallback((e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) =>
        handleClick(e, row_data.id), [handleClick, row_data.id])

    // const NumericCells = useMemo(() => {
    //     const cells = () =>
    //         <React.Fragment>

    //             {
    //                 stpFields.map(cell =>
    //                     // <TableCell align="center" key={ cell }>
    //                     //     { numericData(cell) }{ endSign(cell) }
    //                     // </TableCell>

    //                     <DataCell key={ cell }
    //                         primary={ numericData(cell) }
    //                         secondary={ endSign(cell) }
    //                         cellProps={ { align: 'center' } }
    //                     />
    //                 ) }
    //         </React.Fragment>

    //     return cells
    // }, [endSign, numericData])
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
                onClick={ clickCell }
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
            {/* <DataCell
                primary={ <Box
                    component={ Stack }
                    direction={ 'row' }
                    justifyContent={ 'space-between' }
                    alignItems={ 'center' }
                    width={ '100%' }
                    sx={ {
                        [`& .MuiIconButton-root`]: { visibility: 'hidden' },
                        [`& :hover>.MuiIconButton-root `]: { visibility: 'visible' },
                    } }
                >

                    { row_data.name }
                    <FormulaTTButton stp_name={ row_data.name as string } />
                </Box> }
                // secondary={ <FormulaTTButton stp_name={ row_data.name as string } /> }
                cellProps={ {
                    padding: 'none',
                    align: 'justify',

                } }
            /> */}
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
                        // <TableCell align="center" key={ cell }>
                        //     { numericData(cell) }{ endSign(cell) }
                        // </TableCell>

                        <DataCell key={ cell }
                            primary={ numericData(cell) }
                            secondary={ endSign(cell) }
                            cellProps={ { align: 'center' } }
                        />
                    ) }
            </React.Fragment>
            {/* <NumericCells /> */ }
            {
                // stpFields.map(cell =>
                //     <TableCell align="center" component={ 'td' } key={ cell }>{ row_data[cell] }{ endSign(cell) }</TableCell>

                // )
            }


        </TableRow>
    )
}

const MemedCells = React.memo(({ cell }: { cell: StpData }) => {

    return (
        <React.Fragment>
            { stpFields.map(field => <TableCell align="center" key={ field }>{ cell[field] }</TableCell>) }
        </React.Fragment>
    )
})

StpTableRow.displayName = '__Row_StpData'
type DataCellProps = {
    primary: React.ReactNode
    secondary?: React.ReactNode
    action?: (...args: any) => void
    cellProps?: TableCellProps
}

const DataCell: React.FC<DataCellProps> = ({ primary, secondary, action, cellProps }) => {

    const handleClick = () => {
        action && action()
    }
    return (
        <TableCell onClick={ handleClick } align={ cellProps?.align ? cellProps.align : 'center' } >
            <Stack direction={ 'row' } justifyContent={ 'space-between' }>

                { primary }
                { secondary ? secondary : null }
            </Stack>
        </TableCell>)
}