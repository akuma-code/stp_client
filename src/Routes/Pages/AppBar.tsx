import { Button, Stack, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { GrInfo, GrTable } from "react-icons/gr";
import { MdCompare } from "react-icons/md";
import { Link as RrdLink, useMatches } from 'react-router-dom';
import { routePaths } from '../routePath';
import { MuiLink } from './MuiLink';
export function AppHeaderBreadcrump() {

    // const nav = useMatch(routePaths.export)
    const paths = useMatches()
    const [currentPath] = paths.map(p => p.pathname).slice(1)

    return (
        <Box sx={ { flexGrow: 1 } } displayPrint={ 'none' }>
            <AppBar position="static" color={ `warning` }>
                <Toolbar variant='dense' sx={ {
                    width: '100%', justifyContent: 'space-between',
                    maxHeight: { sm: 100, lg: 300 }
                } } >
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
                    {/* <Typography
                        variant='body1'
                        color={ '#fff' }
                        textAlign={ 'right' }
                        fontFamily={ 'Fira Code' }
                        // letterSpacing={ .4 }
                        // fontWeight={ 'bold' }
                        textTransform={ 'uppercase' }
                        maxWidth={ { lg: 500, sm: 300 } }
                    >


                    </Typography> */}
                    <strong>

                        * В таблице указаны расчетные данные.<br />  Получены в калькуляторе компании РСК.
                    </strong>

                </Toolbar>
            </AppBar>
        </Box >
    );
}

export const AppToolbarHeader = React.memo(AppHeaderBreadcrump)