import { Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { GrTable } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { routePaths } from '../routePath';
import { MdCompare } from "react-icons/md";
import { GiBigGear } from "react-icons/gi";
export function AppHeaderBreadcrump() {
    return (
        <Box sx={ { flexGrow: 1 } }>
            <AppBar position="static" color='secondary'>
                <Toolbar variant='dense'>
                    <IconButton
                        edge={ 'start' }
                        sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige' } }
                    >
                        <GrTable />
                        <Link to={ routePaths.root }> <strong>Overview</strong></Link>
                    </IconButton>
                    <IconButton
                        edge={ 'start' }
                        sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige' } }
                    >
                        <GiBigGear />
                        <Link to={ routePaths.root }> <strong>Подобрать</strong></Link>
                    </IconButton>
                    <IconButton
                        edge={ 'start' }
                        sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige' } }
                    >
                        <MdCompare />
                        <Link to={ routePaths.root }> <strong>Сравнить</strong></Link>
                    </IconButton>
                </Toolbar>

            </AppBar>
        </Box>
    );
}