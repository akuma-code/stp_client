import { Checkbox, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { CamAvatar } from '../CamsAvatars';
import { _pathToUrl } from '../../../Helpers/urlpath';
import { camsAvatarGroup, camsArray } from './SideForm';

interface SelectorCamsProps {
    cams: number[];
    handleChange: (event: SelectChangeEvent<number[]>, child: React.ReactNode) => void;
}

export const SelectCams = ({ cams, handleChange }: SelectorCamsProps) => {

    return <Select
        title='Камеры'
        multiple
        fullWidth
        labelId="cams-label"
        name='cams'
        value={ cams }
        onChange={ handleChange }
        input={ <OutlinedInput id='cams' /> }
        MenuProps={ {
            PaperProps: {
                style: {
                    height: 130,
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
