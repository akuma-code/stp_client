import { Avatar, Checkbox, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FilterStore } from '../../../Context/Stores/FiltrationStore';
import { useToggle } from '../../../Hooks/useToggle';
import { Stp_Tags } from '../../../Interfaces/Enums';
import { VoidFn } from '../../../Interfaces/Types';
import { StpTag } from '../../StpTable/TableObjects';
import { TagAvatarIcon } from '../TagAvatars';
import { tagsAvatarGroup } from './AvatarGroups';
import FadingResetButton from './FadingResetButton';
import { tagsArray } from './SideForm';

type FilterHandler = (event: SelectChangeEvent<StpTag[]>, child: React.ReactNode) => void
interface TagSelectorProps {
    tags: FilterStore['tags'];
    handleChange: FilterHandler;
    handleReset: VoidFn;
    handleApply: VoidFn;
}

export const SelectTags = observer(({ tags, handleChange, handleReset, handleApply }: TagSelectorProps) => {
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
        input={
            <OutlinedInput sx={ { fontSize: 12 } } label='_________________'
                endAdornment={
                    <FadingResetButton
                        open={ tags.length !== 0 && !o }
                        action={ handleReset }
                    />
                }
            />
        }

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
})

SelectTags.displayName = 'Selector Tags'