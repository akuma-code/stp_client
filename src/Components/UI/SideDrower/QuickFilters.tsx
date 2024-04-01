import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { CamAvatar, CamOneIcon, CamTwoIcon } from '../CamsAvatars';


const actions = [
    { name: '1 cam', icon: <CamOneIcon /> },
    { name: '2 cam', icon: <CamTwoIcon /> },

];

export function CamsSpeedDial() {
    return (
        <Box sx={ {
            transform: 'translateZ(0px)',
            flexGrow: 1,

        } }>
            <SpeedDial
                ariaLabel="Cams filter"
                // sx={ { position: 'absolute', bottom: 16, right: 16 } }
                icon={ <SpeedDialIcon /> }
                direction='right'
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