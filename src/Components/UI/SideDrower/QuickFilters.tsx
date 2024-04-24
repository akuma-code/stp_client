import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { CamOneIcon, CamTwoIcon } from '../CamsAvatars';


const actions = [
    { name: '1 cam', icon: <CamOneIcon /> },
    { name: '2 cam', icon: <CamTwoIcon /> },

];

export function CamsSpeedDial() {
    return (
        <Box sx={ {
            transform: 'translateY(-22px)',
            flexGrow: 0,
            // overflowY: 'visible',
            position: 'relative'
        } }>
            <SpeedDial
                ariaLabel="Cams filter"
                sx={ { position: 'absolute', top: 0 } }
                icon={ <SpeedDialIcon /> }
                direction='down'
                FabProps={ { variant: 'circular' } }
            >
                { actions.map((action) => (
                    <SpeedDialAction
                        key={ action.name }
                        icon={ action.icon }
                        tooltipTitle={ action.name }

                    />
                )) }
            </SpeedDial>
        </Box>
    );
}