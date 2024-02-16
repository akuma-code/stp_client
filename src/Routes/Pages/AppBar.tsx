import { Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { GrTable } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { routePaths } from '../routePath';
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
                </Toolbar>

            </AppBar>
        </Box>
    );
}