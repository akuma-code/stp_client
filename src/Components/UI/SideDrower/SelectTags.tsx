import { Avatar, Checkbox, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { StpTag } from '../../StpTable/TableObjects';
import { FilterStore } from '../../../Context/Stores/FiltrationStore';
import { TagAvatarIcon } from '../TagAvatars';
import { Stp_Tags } from '../../../Interfaces/Enums';
import { tagsArray } from './SideForm';
import { tagsAvatarGroup } from './AvatarGroups';
import FadingResetButton from './FadingResetButton';
import { VoidFn } from '../../../Interfaces/Types';
import FadingCheckFab from './FadingCheckFab';
import { useToggle } from '../../../Hooks/useToggle';

type FilterHandler = (event: SelectChangeEvent<StpTag[]>, child: React.ReactNode) => void
interface TagSelectorProps {
    tags: FilterStore['tags'];
    handleChange: FilterHandler;
    handleReset: VoidFn;
    handleApply: VoidFn;
}

export function SelectTags({ tags, handleChange, handleReset, handleApply }: TagSelectorProps) {
    const [o, { on, off }] = useToggle()
    const handleClose = () => {
        handleApply()
        off()
    }
    const handleOpen = () => {
        on()
    }
    return <Select
        fullWidth

        multiple
        labelId="multitag-label"
        id="multitag"
        name='tags'
        value={ tags }
        open={ o }
        onChange={ handleChange }
        onOpen={ handleOpen }
        onClose={ handleClose }
        input={ <OutlinedInput sx={ { fontSize: 12 } } label='_________________'
            endAdornment={
                <FadingResetButton
                    open={ tags.length !== 0 }
                    action={ handleReset }


                />
            }
        // startAdornment={ <FadingCheckFab
        //     open={ tags.length !== 0 && o }
        //     action={ handleClose }
        // /> }
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
