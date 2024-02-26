import { Button, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { GrTable } from "react-icons/gr";
import { MdCompare } from "react-icons/md";
import { Link, useMatch, useMatches, useNavigate, useNavigation, useResolvedPath } from 'react-router-dom';
import { routePaths } from '../routePath';
import { LuPrinter } from "react-icons/lu";
import { useAppContext } from '../../Hooks/useStoresContext';


export function AppHeaderBreadcrump() {
    const { selectedItems } = useAppContext()
    // const nav = useMatch(routePaths.export)
    const paths = useMatches()
    const [currentPath] = paths.map(p => p.pathname).slice(1)

    return (
        <Box sx={ { flexGrow: 1 } }>
            <AppBar position="static" color={ `warning` } >
                <Toolbar variant='dense'>
                    <IconButton
                        edge={ 'start' }
                        sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige' } }

                    >
                        <GrTable />
                        <Link to={ routePaths.root }> <strong>
                            { currentPath !== routePaths.root
                                ? "На главную"
                                : "Таблица"
                            }
                        </strong></Link>
                    </IconButton>
                    { currentPath === routePaths.compare
                        ?
                        <Button size='large' variant='outlined'
                            sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige' } }

                        >
                            <LuPrinter />
                            <Link to={ routePaths.export }> <strong>Экспорт</strong></Link>
                        </Button>
                        :
                        <IconButton disabled={ selectedItems.length === 0 }
                            edge={ 'start' }
                            sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige' } }

                        >
                            <MdCompare />
                            <Link to={ routePaths.compare }> <strong>Сравнить</strong></Link>
                        </IconButton>
                    }

                </Toolbar>
            </AppBar>
        </Box>
    );
}


