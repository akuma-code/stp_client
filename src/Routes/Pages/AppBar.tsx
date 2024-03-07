import { Button, Stack, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { GrInfo, GrTable } from "react-icons/gr";
import { MdCompare } from "react-icons/md";
import { Link as RrdLink, useMatches } from 'react-router-dom';
import { routePaths } from '../routePath';
import { AttikSvgLogo } from '../../Components/UI/Svg/Attik';
import { MuiLink } from './MuiLink';

export function AppHeaderBreadcrump() {

    // const nav = useMatch(routePaths.export)
    const paths = useMatches()
    const [currentPath] = paths.map(p => p.pathname).slice(1)

    return (
        <Box sx={ { flexGrow: 1 } } displayPrint={ 'none' }>
            <AppBar position="static" color={ `warning` }>
                <Toolbar variant='dense' sx={ { width: '100%', justifyContent: 'space-between' } }>
                    <Box component={ Stack } direction={ 'row' } my={ 1 } gap={ 4 }>

                        <IconButton
                            edge={ 'start' }
                            sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige' } }

                        >
                            <GrTable />
                            <RrdLink to={ routePaths.root }> <strong>
                                { currentPath !== routePaths.root
                                    ? "На главную"
                                    : "Таблица"
                                }
                            </strong></RrdLink>
                        </IconButton>
                        { currentPath === routePaths.compare
                            ?
                            null
                            :
                            <IconButton
                                edge={ 'start' }
                                sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige' } }

                            >
                                <MdCompare />
                                <RrdLink to={ routePaths.compare }> <strong>Сравнить</strong></RrdLink>
                            </IconButton>
                        }
                        <Button
                            variant='text'
                            color='error'
                            startIcon={ <GrInfo /> }
                            sx={ { color: 'whitesmoke', ml: { lg: 4, sm: 2 } } }
                        >
                            <Box component={ MuiLink } to={ routePaths.stp_info } >

                                Дополнительно
                            </Box>
                        </Button>
                    </Box>
                    <Typography
                        variant='body1'
                        color={ '#fff' }
                        textAlign={ 'right' }
                        fontFamily={ 'Fira Code' }
                        // letterSpacing={ .4 }
                        // fontWeight={ 'bold' }
                        textTransform={ 'uppercase' }
                        maxWidth={ { lg: 500, sm: 300 } }
                    >
                        <strong>

                            * В таблице указаны расчетные данные.
                        </strong>
                        <br />
                        <strong>
                            Получены в калькуляторе компании РСК.
                        </strong>
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box >
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


