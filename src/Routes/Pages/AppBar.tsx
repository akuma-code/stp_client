import { Breadcrumbs, Button, Stack, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { GrInfo, GrTable } from "react-icons/gr";
import { Link as RrdLink } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routePaths } from '../routePath';
import { MuiLink } from './MuiLink';
export function AppHeaderBreadcrump() {


    return (
        <Box displayPrint={ 'none' } >
            <AppBar position="fixed" color={ `warning` } sx={ {
                // height: { sm: 80, md: 100 },
                maxHeight: 100
            } }>
                <Toolbar variant='dense' sx={ {
                    width: '100%',
                    justifyContent: 'space-between',

                } } >
                    <Breadcrumbs component={ Stack } direction={ 'row' } my={ 0 } gap={ 4 } separator={ '//' } >

                        <IconButton
                            edge={ 'start' }
                            sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige' } }

                        >
                            <GrTable />
                            <RrdLink to={ routePaths.v1 }>
                                <strong>
                                    На главную
                                </strong>
                            </RrdLink>
                        </IconButton>
                        {/* { currentPath === routePaths.compare
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
                        } */}
                        {/* <Button
                            variant='text'
                            color='error'
                            startIcon={ <GrInfo /> }
                            sx={ { color: 'whitesmoke', ml: { lg: 4, sm: 2 } } }
                        >
                            <Box component={ MuiLink } to={ routePaths.stp_info } >

                                Дополнительно
                            </Box>
                        </Button> */}
                        <IconButton
                            edge={ 'start' }
                            sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige' } }
                        >
                            <GrInfo />
                            <RrdLink to={ routePaths.stp_info }>
                                Дополнительно
                            </RrdLink>
                        </IconButton>
                        <IconButton
                            edge={ 'start' }
                            sx={ { mx: 2, display: 'flex', gap: 2, color: 'beige' } }
                        >
                            <RrdLink to={ routePaths.v2 }>
                                вариант 2
                            </RrdLink>
                        </IconButton>
                    </Breadcrumbs>
                    {/* <small onClick={ notify }> { host === 'http://localhost:3000' && host } </small> */ }
                    <strong className='text-md text-wrap'>

                        * В таблице указаны расчетные данные.<br />
                        Получены в калькуляторе компании РСК.
                    </strong>

                </Toolbar>
            </AppBar>
            <Toolbar variant='dense' />
        </Box >
    );
}

export const AppToolbarHeader = React.memo(AppHeaderBreadcrump)