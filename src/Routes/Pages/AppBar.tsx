import { Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { GrTable } from "react-icons/gr";
import { MdCompare } from "react-icons/md";
import { Link, useMatch, useNavigate, useNavigation } from 'react-router-dom';
import { routePaths } from '../routePath';

import { useAppContext } from '../../Hooks/useStoresContext';


export function AppHeaderBreadcrump() {
    const { selectedItems } = useAppContext()
    const nav = useMatch(routePaths.export)
    console.log('nav', nav?.pathname)
    return (nav?.pathname !== '/export' &&
        <Box sx={ { flexGrow: 1 } }>
            <AppBar position="static" color={ `warning` } >
                <Toolbar variant='dense'>
                    <IconButton
                        edge={ 'start' }
                        sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige' } }

                    >
                        <GrTable />
                        <Link to={ routePaths.root }> <strong>Таблица</strong></Link>
                    </IconButton>

                    <IconButton disabled={ selectedItems.length === 0 }
                        edge={ 'start' }
                        sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige' } }

                    >
                        <MdCompare />
                        <Link to={ routePaths.compare }> <strong>Сравнить</strong></Link>
                    </IconButton>

                </Toolbar>
            </AppBar>
        </Box>
    );
}


