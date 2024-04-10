import { AppBar, Button, Paper } from '@mui/material';
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


            <AppBar position='static' color='warning'>

                <Box
                    m={ 1 }
                    px={ 2 }
                    display={ 'flex' }
                    displayPrint={ 'none' }
                    flexDirection={ 'row' }
                    justifyContent={ 'space-between' }

                >
                    <Breadcrumbs aria-label="breadcrumb" separator={ '/' } color='whitesmoke' sx={ { flexGrow: 1 } }>
                        <LinkRouter to={ routePaths.table } underline='hover'>
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

                    <LoginDialog />
                </Box>
            </AppBar>

        </Paper>
    );
}


