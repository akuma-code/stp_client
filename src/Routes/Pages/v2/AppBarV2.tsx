import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Link, { LinkProps } from '@mui/material/Link';
import { ListItemProps } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { AiOutlineMenuFold } from "react-icons/ai";
import {
    Link as RouterLink,
    Route,
    Routes,
    MemoryRouter,
    useLocation,
    Form,
    redirect,
} from 'react-router-dom';
import MemoAvaS3 from '../../../Components/UI/Svg/AvaS3';
import { routePaths } from '../../routePath';
import { AppBar, Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, Menu, MenuItem, MenuList, Modal, Paper, Stack, TextField } from '@mui/material';
import { useToggle } from '../../../Hooks/useToggle';
import { VoidFn } from '../../../Interfaces/Types';
import { AvatarButtonTooltip } from '../../../Components/UI/AvatarButtonTooltip';
import { useFilterContext } from '../../../Hooks/useFilterContext';

interface ListItemLinkProps extends ListItemProps {
    to: string;
    open?: boolean;
    item_icon?: React.ReactNode
}

const breadcrumbNameMap: { [key: string]: string } = {
    '/inbox': 'Inbox',
    '/inbox/important': 'Important',
    '/trash': 'Trash',
    '/spam': 'Spam',
    '/drafts': 'Drafts',
};

function ListItemLink(props: ListItemLinkProps) {
    const { to, open, ...other } = props;
    const primary = breadcrumbNameMap[to];

    let icon = null;
    if (open != null) {
        icon = open ? <ExpandLess /> : <ExpandMore />;
    }

    return (
        <li>
            <ListItemButton component={ RouterLink as any } to={ to } { ...other }>
                <ListItemText primary={ primary } />
                { props.item_icon ? props.item_icon : icon }
            </ListItemButton>
        </li>
    );
}

interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
    children?: React.ReactNode
}

function LinkRouter(props: LinkRouterProps) {
    return <Link { ...props } component={ RouterLink as any }  >{ props.children }</Link>;
}

export function AppbarV2() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const [show, modal] = useToggle(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLButtonElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onOpenModal = () => {
        modal.on()
        handleClose()
    }
    const onCloseModal = () => {
        modal.off()
    }
    const menuRef = React.useRef<HTMLButtonElement | null>(null)

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


                                <Typography variant='button' fontWeight={ 'bold' } color={ 'whitesmoke' }>версия 1</Typography>
                            </Button>
                        </LinkRouter>
                    </Breadcrumbs>
                    <>
                        {/* <IconButton edge={ 'end' } sx={ { mr: 4 } } onClick={ handleClick }>
                            <Avatar variant='rounded' > <AiOutlineMenuFold color={ '#000000' } /></Avatar>
                        </IconButton>
                        <Menu open={ open } onClose={ handleClose }
                            anchorEl={ anchorEl }
                            anchorOrigin={ { horizontal: 'left', vertical: 'bottom' } }
                        // anchorPosition={ { left: 100, top: 100 } }
                        >
                            <MenuList >

                                <MenuItem onClick={ onOpenModal }>Login</MenuItem>
                            </MenuList>
                        </Menu> */}
                    </>
                    <LoginDialog />
                </Box>
            </AppBar>

        </Paper>
    );
}

type LoginDialogProps = {

}
export const LoginDialog = (props: LoginDialogProps) => {
    const [open, modal] = useToggle(false)
    const { auth } = useFilterContext()
    return (
        <>
            <AvatarButtonTooltip
                icon={ <AiOutlineMenuFold color={ '#000000' } /> }
                tooltip_title='Login'
                action={ modal.toggle }
            />
            <Dialog
                open={ open }
                onClose={ modal.off }
                keepMounted
            // PaperProps={ {
            //     component: Form,
            //     onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            //         event.preventDefault();
            //         const formData = new FormData(event.currentTarget);
            //         const formJson = Object.fromEntries((formData as any).entries());
            //         auth.login(formJson.login, formJson.pass)
            //         console.log(formJson);
            //         modal.off()
            //     }
            // } }
            >
                <DialogTitle>Autorization</DialogTitle>
                <DialogContent>
                    <Form onSubmit={ (event: React.FormEvent<HTMLFormElement>) => {
                        // event.preventDefault()
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        // auth.login(formJson.login, formJson.pass)
                        console.log(formJson);
                        modal.off()

                    } }

                        id='authform'
                    >

                        <InputLabel id='name-input-label' htmlFor='name-input'>Login</InputLabel>
                        <TextField variant='filled' name='login' id='name-input' />

                        <InputLabel id='pass-input-label' htmlFor='pass-input'>Password</InputLabel>
                        <TextField variant='filled' name='pass' id='pass-input' />
                    </Form>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' form='authform'>Submit</Button>
                    <Button type='reset'>Reset</Button>
                    <Button onClick={ modal.off }>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export function MemoryRouterPage() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <MemoryRouter initialEntries={ ['/inbox'] } initialIndex={ 0 }>
            <Box sx={ { display: 'flex', flexDirection: 'column', width: 360 } }>
                <Routes>
                    <Route path="*" element={ <AppbarV2 /> } />
                </Routes>
                <Box
                    sx={ {
                        bgcolor: 'background.paper',
                        mt: 1,
                    } }
                    component="nav"
                    aria-label="mailbox folders"
                >
                    <List>
                        <ListItemLink to="/inbox" open={ open } onClick={ handleClick } />
                        <Collapse component="li" in={ open } timeout="auto" unmountOnExit>
                            <List disablePadding>
                                <ListItemLink sx={ { pl: 4 } } to="/inbox/important" />
                            </List>
                        </Collapse>
                        <ListItemLink to="/trash" />
                        <ListItemLink to="/spam" />
                    </List>
                </Box>
            </Box>
        </MemoryRouter>
    );
}