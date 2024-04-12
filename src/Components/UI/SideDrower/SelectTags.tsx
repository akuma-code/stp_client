import { Avatar, Checkbox, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { StpTag } from '../../StpTable/TableObjects';
import { FilterStore } from '../../../Context/Stores/FiltrationStore';
import { TagAvatarIcon } from '../TagAvatars';
import { Stp_Tags } from '../../../Interfaces/Enums';
import { tagsArray } from './SideForm';
import { tagsAvatarGroup } from './AvatarGroups';
import FadingResetButton from './FadingResetButton';
import { VoidFn } from '../../../Interfaces/Types';

type FilterHandler = (event: SelectChangeEvent<StpTag[]>, child: React.ReactNode) => void
export function SelectTags({ tags, handleChange, handleReset }: { tags: FilterStore['tags']; handleChange: FilterHandler, handleReset: VoidFn },) {
    return <Select
        fullWidth

        multiple
        labelId="multitag-label"
        id="multitag"
        name='tags'
        value={ tags }
        onChange={ handleChange }
        input={ <OutlinedInput sx={ { fontSize: 12 } } label='_________________'
            endAdornment={
                <FadingResetButton
                    action={ handleReset }
                    open={ tags.length !== 0 }

                />
            }
        /> }
        renderValue={ tagsAvatarGroup }
    >

        { tagsArray.map((tag) => (
            <MenuItem key={ tag } value={ tag } divider dense>
                <Checkbox checked={ tags?.includes(tag) } name={ tag + '_check' } />
                <ListItemText primary={ Stp_Tags[tag] } />
                <Avatar sx={ { height: 24, width: 24, fontSize: 15, bgcolor: '#3d9fe0' } } variant='rounded'>
                    { TagAvatarIcon[tag as StpTag] }
                </Avatar>
            </MenuItem>
        )) }
    </Select>;
}
