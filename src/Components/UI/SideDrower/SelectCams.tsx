import { Checkbox, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { CamAvatar } from '../CamsAvatars';
import { _pathToUrl } from '../../../Helpers/urlpath';
import { camsArray } from './SideForm';
import { camsAvatarGroup } from './AvatarGroups';
import { VoidFn } from '../../../Interfaces/Types';
import { useToggle } from '../../../Hooks/useToggle';

interface SelectorCamsProps {
    cams: number[];
    handleChange: (event: SelectChangeEvent<number[]>, child: React.ReactNode) => void;
    handleReset: VoidFn, handleApply: VoidFn
}

export const SelectCams = ({ cams, handleChange, handleReset, handleApply }: SelectorCamsProps) => {
    const [o, { on, off }] = useToggle()
    const handleClose = () => {
        handleApply()
        off()
    }
    const handleOpen = () => {
        on()
    }
    return <Select
        title='Камеры'
        multiple
        fullWidth
        labelId="cams-label"
        name='cams'
        value={ cams }
        open={ o }
        onChange={ handleChange }
        onClose={ handleClose }
        onOpen={ handleOpen }
        input={ <OutlinedInput id='cams' label='_______' /> }
        MenuProps={ {
            PaperProps: {
                style: {
                    // height: 130,
                    width: 170,
                },
                variant: 'outlined',
                elevation: 0,
            },
        } }
        SelectDisplayProps={ {
            style: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }
        } }
        renderValue={ camsAvatarGroup }
    >

        { camsArray.map((cam) => (
            <MenuItem key={ cam } value={ cam } divider dense>
                <Checkbox checked={ cams.includes(cam) } name={ _pathToUrl('cams_' + cam) } />
                <ListItemText primary={ `${cam + 1} стекла` } />
                <CamAvatar cam_count={ cam } wh={ '1.3em' } />
            </MenuItem>

        )) }

    </Select>;
}
