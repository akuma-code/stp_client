import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useToggle } from '../../Hooks/useToggle';
import { StpTypeFormGroup } from './StpTypeFormGroup';
import { GiConfirmed } from "react-icons/gi";
import { Box, Stack } from '@mui/material';
import { FaBarsProgress } from "react-icons/fa6";
interface EnhancedTableToolbarProps {
    numSelected: number;
}
export function StpTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    const [group, make] = useToggle(true)
    return (
        <Toolbar
            sx={ {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                height: 100,
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            } }
        >
            <Stack sx={ { flex: '1 1 20%', flexDirection: 'row', alignItems: 'center' } }>

                { numSelected > 0 ? (
                    <Typography
                        // sx={ { flex: '1 1 20%' } }
                        textAlign={ 'center' }
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                        id="tableTitle"
                    >
                        { numSelected } выбрано
                    </Typography>
                ) : (
                    <Typography
                        // sx={ { flex: '1 1 20%' } }
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Стеклопакеты
                    </Typography>
                ) }
            </Stack>
            <Stack sx={ { flexDirection: 'row', alignItems: 'center' } }>

                <StpTypeFormGroup open={ group } />
                { !group &&
                    <span className='mx-3 text-2xl'>Отфильтровать по типу</span>
                }
                <IconButton onClick={ make.toggle } sx={ { bgcolor: '#a0d9f3' } }>
                    <FaBarsProgress />
                </IconButton>
            </Stack>

        </Toolbar>
    );
}
