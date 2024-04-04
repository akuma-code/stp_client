import { Checkbox, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { FilterStore } from '../../../Context/Stores/FiltrationStore';
import { depthArray } from './SideForm';
import { ImCross } from "react-icons/im";
type DeptSelectionProps = { depths: FilterStore['depth']; handleChange: (event: SelectChangeEvent<number[]>, child: React.ReactNode) => void; }
export function SelectDepth({ depths, handleChange }: DeptSelectionProps) {
    return <Select
        fullWidth
        multiple
        labelId="depth-label"
        name='depth'
        value={ depths }
        onChange={ handleChange }
        input={ <OutlinedInput /> }
        inputProps={ { sx: { fontSize: 12 }, } }
        renderValue={ (selected) => selected?.map(s => `${s} мм`).join(', ') || 'Ничего не выбрано' }

    >

        { depthArray.map((depth) => (
            <MenuItem key={ depth } value={ depth } divider dense>
                <Checkbox checked={ depths.includes(depth) } name={ depth + '_checkDepth' } />
                <ListItemText primary={ `${depth} мм` } />
            </MenuItem>

        )) }

    </Select>;
}
