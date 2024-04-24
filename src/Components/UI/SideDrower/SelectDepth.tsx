import { Button, Checkbox, Fab, Fade, ListItemButton, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { FilterStore } from '../../../Context/Stores/FiltrationStore';
import { depthArray } from './SideForm';
import { ImCross } from "react-icons/im";
import { VoidFn } from '../../../Interfaces/Types';
import { observer } from 'mobx-react-lite';
import { useToggle } from '../../../Hooks/useToggle';
import { CloseOutlined } from '@mui/icons-material';
import FadingResetButton from './FadingResetButton';
import FadingCheckFab from './FadingCheckFab';
type DeptSelectionProps = {
    depths: FilterStore['depth'];
    handleChange: (event: SelectChangeEvent<number[]>, child: React.ReactNode) => void;
    handleReset: VoidFn
    handleApply: VoidFn
}
export const SelectDepth = observer(({ depths, handleChange, handleReset, handleApply }: DeptSelectionProps) => {
    const [o, { on, off }] = useToggle()
    const handleClose = () => {
        handleApply()
        off()
    }
    const handleOpen = () => {
        on()
    }
    return (
        <>
            <Select
                fullWidth
                multiple
                labelId="depth-label"
                name='depth'
                id='depth-selector'
                value={ depths }
                onChange={ handleChange }
                onClose={ handleClose }
                onOpen={ handleOpen }
                open={ o }
                input={ <OutlinedInput id={ 'depth' } label='_____________'
                    endAdornment={
                        <FadingResetButton
                            open={ depths.length !== 0 && !o }
                            action={ handleReset }
                        />
                    }

                /> }
                inputProps={ { sx: { fontSize: 12 } } }
                renderValue={ (selected) => selected?.map(s => `${s} мм`).join(', ') }

            >

                { depthArray.map((depth) => (
                    <MenuItem key={ depth } value={ depth } divider dense
                    // sx={ { justifyContent: 'space-between', display: 'flex' } }
                    >
                        <Checkbox checked={ depths.includes(depth) } name={ depth + '_checkDepth' } />
                        <ListItemText primary={ `${depth} мм` } />
                    </MenuItem>

                )) }


            </Select>

        </>
    )
})



SelectDepth.displayName = 'Selector Depth'
