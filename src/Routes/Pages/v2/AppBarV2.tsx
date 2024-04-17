import { AppBar, Button, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link, { LinkProps } from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useIsFetching } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
    Link as RouterLink,
} from 'react-router-dom';
import MemoAvaS3 from '../../../Components/UI/Svg/AvaS3';
import { useFilterContext } from '../../../Hooks/useFilterContext';
import { apiRoute, routePaths } from '../../routePath';
import { LoginDialog } from './LoginDialog';
// const AttikLogo = React.lazy(() => import('../../../Components/UI/Svg/Attik'))


interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
    children?: React.ReactNode
}

export function LinkRouter(props: LinkRouterProps) {
    return <Link { ...props } component={ RouterLink as any }  >{ props.children }</Link>;
}

export const AppbarV2 = observer(() => {

    const { auth } = useFilterContext()
    const global = useIsFetching()
    const [role, setRole] = useState<'user' | 'admin'>('user')
    useEffect(() => {
        auth.checkAuth()
        if (auth.isAuth) setRole('admin')
        else setRole('user')

    }, [auth])
    return (
        <Paper elevation={ 1 }>


            <AppBar position='static' color='warning' sx={ { overflow: 'clip' } }>

                <Box

                    pl={ 2 }
                    display={ 'flex' }
                    displayPrint={ 'none' }
                    flexDirection={ 'row' }
                    justifyContent={ 'space-between' }
                    alignItems={ 'center' }

                >
                    <Breadcrumbs aria-label="breadcrumb" separator={ '/' } color='whitesmoke' sx={ { flexGrow: 1 } }>
                        <LinkRouter to={ routePaths.root } underline='hover'>
                            <Button variant='text' endIcon={ <MemoAvaS3 /> } size='large' color='inherit'>
                                <Typography variant='button' fontWeight={ 'bold' } color={ 'whitesmoke' }>На главную</Typography>
                            </Button>
                        </LinkRouter>

                        <LinkRouter to={ routePaths.info } underline='hover'>
                            <Button variant='text' size='large' color='inherit'>


                                <Typography variant='button' fontWeight={ 'bold' } color={ 'whitesmoke' }>Дополнительная информация</Typography>
                            </Button>
                        </LinkRouter>
                        {
                            role === 'admin' &&
                            <LinkRouter to={ routePaths.table } underline='hover'>
                                <Button variant='text' size='large' color='inherit'>
                                    <Typography variant='button' fontWeight={ 'bold' } color={ 'whitesmoke' }>Новая версия таблицы</Typography>
                                </Button>
                            </LinkRouter>

                        }
                        {
                            role === 'admin' &&

                            <LinkRouter to={ '/' + apiRoute.api } underline='hover'>
                                <Button variant='text' size='large' color='inherit'>
                                    <Typography variant='caption' color={ 'whitesmoke' }>GoogleApi</Typography>
                                </Button>
                            </LinkRouter>
                        }

                    </Breadcrumbs>
                    <LoginDialog />
                    {/* <AttikSvgLogo /> */ }
                    {/* <Box height={ 50 } width={ 200 }
                        overflow={ 'clip' }
                        position={ 'relative' }
                    > */}
                    {/* <React.Suspense fallback={ <CircularProgress variant='indeterminate' thickness={ 5 } color='error' /> }>


                            <Box
                                bgcolor={ 'whitesmoke' }
                                width={ 180 }
                                height={ 200 }
                                position={ 'absolute' }
                                right={ -50 }
                                top={ -40 }
                                borderRadius={ '50%' }
                                pr={ 20 }
                                pt={ 3 }

                            >
                                <Box sx={ { transform: 'scale(.7)' } }>
                                    <AttikLogo />
                                </Box>
                            </Box>
                        </React.Suspense> */}
                    {/* </Box> */ }
                </Box>
            </AppBar>

        </Paper>
    );
})


AppbarV2.displayName = '__AppBar V2'