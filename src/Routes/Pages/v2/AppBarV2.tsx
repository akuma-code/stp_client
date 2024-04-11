import { AppBar, Button, CircularProgress, Paper, SvgIcon } from '@mui/material';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link, { LinkProps } from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {
    Link as RouterLink,
    useLocation
} from 'react-router-dom';
import MemoAvaS3 from '../../../Components/UI/Svg/AvaS3';
import { routePaths } from '../../routePath';
import { LoginDialog } from './LoginDialog';

const AttikLogo = React.lazy(() => import('../../../Components/UI/Svg/Attik'))


interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
    children?: React.ReactNode
}

export function LinkRouter(props: LinkRouterProps) {
    return <Link { ...props } component={ RouterLink as any }  >{ props.children }</Link>;
}

export function AppbarV2() {
    const { search } = useLocation();



    return (
        <Paper elevation={ 1 }>


            <AppBar position='static' color='warning' sx={ { overflow: 'clip' } }>

                <Box
                    // m={ 1 }
                    pl={ 2 }
                    display={ 'flex' }
                    displayPrint={ 'none' }
                    flexDirection={ 'row' }
                    justifyContent={ 'space-between' }
                    alignItems={ 'center' }

                >
                    <Breadcrumbs aria-label="breadcrumb" separator={ '/' } color='whitesmoke' sx={ { flexGrow: 1 } }>
                        <LinkRouter to={ routePaths.v2 } underline='hover'>
                            <Button variant='text' endIcon={ <MemoAvaS3 /> } size='large' color='inherit'>
                                <Typography variant='button' fontWeight={ 'bold' } color={ 'whitesmoke' }>На главную</Typography>
                            </Button>
                        </LinkRouter>

                        <LinkRouter to={ routePaths.info } underline='hover'>
                            <Button variant='text' size='large' color='inherit'>


                                <Typography variant='button' fontWeight={ 'bold' } color={ 'whitesmoke' }>Дополнительная информация</Typography>
                            </Button>
                        </LinkRouter>
                        <LinkRouter to={ '/' + routePaths.v1 } underline='hover'>
                            <Button variant='text' size='large' color='inherit'>


                                <Typography variant='button' color={ 'whitesmoke' }>версия 1</Typography>
                            </Button>
                        </LinkRouter>
                        <LinkRouter to={ routePaths.old } underline='hover'>
                            <Button variant='text' size='large' color='inherit'>


                                <Typography variant='button' fontWeight={ 'bold' } color={ 'whitesmoke' }>Старая версия</Typography>
                            </Button>
                        </LinkRouter>
                    </Breadcrumbs>
                    <React.Suspense fallback={ <CircularProgress variant='indeterminate' thickness={ 5 } color='error' /> }>
                        <Box height={ 50 } width={ 200 }
                            overflow={ 'clip' }
                            position={ 'relative' }
                        >


                            <Box
                                bgcolor={ 'white' }
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
                            {/* <LoginDialog /> */ }
                        </Box>
                    </React.Suspense>
                </Box>
            </AppBar>

        </Paper>
    );
}


