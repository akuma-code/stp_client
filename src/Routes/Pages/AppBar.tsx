import { Button, Stack, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { GrTable } from "react-icons/gr";
import { MdCompare } from "react-icons/md";
import { Link, useMatches } from 'react-router-dom';
import { useAppContext } from '../../Hooks/useStoresContext';
import { routePaths } from '../routePath';


export function AppHeaderBreadcrump() {
    const { selectedItems } = useAppContext()
    // const nav = useMatch(routePaths.export)
    const paths = useMatches()
    const [currentPath] = paths.map(p => p.pathname).slice(1)

    return (
        <Box sx={ { flexGrow: 1 } } displayPrint={ 'none' }>
            <AppBar position="static" color={ `warning` }>
                <Toolbar variant='dense' sx={ { width: '100%', justifyContent: 'space-between' } }>
                    <Box component={ Stack } direction={ 'row' } my={ 1 }>

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
                            null
                            // <Button size='medium' variant='text'
                            //     sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige', fontSize: 20, alignSelf: 'center' } }

                            // >

                            //     <Link to={ routePaths.export }> <strong>Экспортировать</strong></Link>
                            // </Button>
                            :
                            <IconButton disabled={ selectedItems.length === 0 }
                                edge={ 'start' }
                                sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige' } }

                            >
                                <MdCompare />
                                <Link to={ routePaths.compare }> <strong>Сравнить</strong></Link>
                            </IconButton>
                        }

                    </Box>
                    <WarnText />
                </Toolbar>
            </AppBar>
        </Box>
    );
}


const WarnText = () => {
    return (<Typography
        variant='h6'
        color={ '#fff' }
        textAlign={ 'right' }
    >
        * В таблице указаны расчетные данные. Получены из калькулятора компании РСК.
    </Typography>)
}