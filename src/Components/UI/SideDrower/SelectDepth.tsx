import { Button, Checkbox, Fab, Fade, ListItemButton, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { FilterStore } from '../../../Context/Stores/FiltrationStore';
import { depthArray } from './SideForm';
import { ImCross } from "react-icons/im";
import { VoidFn } from '../../../Interfaces/Types';
import { observer } from 'mobx-react-lite';
import { useToggle } from '../../../Hooks/useToggle';
import { CloseOutlined } from '@mui/icons-material';
import FadingResetButton from './FadingResetButton';
type DeptSelectionProps = {
    depths: FilterStore['depth'];
    handleChange: (event: SelectChangeEvent<number[]>, child: React.ReactNode) => void;
    handleReset: VoidFn
}
export const SelectDepth = observer(({ depths, handleChange, handleReset }: DeptSelectionProps) => {

    return (
        <>
            <Select
                fullWidth
                multiple
                labelId="depth-label"
                name='depth'
                value={ depths }
                onChange={ handleChange }
                input={ <OutlinedInput label='_____________' startAdornment={
                    <FadingResetButton
                        open={ depths.length !== 0 }
                        action={ handleReset }
                    />
                } /> }
                inputProps={ { sx: { fontSize: 12 }, } }
                renderValue={ (selected) => selected?.map(s => `${s} мм`).join(', ') || 'Ничего не выбрано' }

            >

                { depthArray.map((depth) => (
                    <MenuItem key={ depth } value={ depth } divider dense>
                        <Checkbox checked={ depths.includes(depth) } name={ depth + '_checkDepth' } />
                        <ListItemText primary={ `${depth} мм` } />
                    </MenuItem>

                )) }


            </Select>

        </>
    )
})




