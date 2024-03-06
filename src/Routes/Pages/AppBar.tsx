import { Button, ListItem, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { GrTable } from "react-icons/gr";
import { MdCompare } from "react-icons/md";
import { Link as RrdLink, useMatches, LinkProps as RouterLinkProps } from 'react-router-dom';
import { useAppContext } from '../../Hooks/useStoresContext';
import { routePaths } from '../routePath';
import { GrInfo } from "react-icons/gr";
import { forwardRef } from 'react';

export function AppHeaderBreadcrump() {
    const { selectedItems } = useAppContext()
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
                            <IconButton disabled={ selectedItems.length === 0 }
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


interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}

const MuiLink = forwardRef<HTMLAnchorElement, RouterLinkProps>((itemProps, ref) => <RrdLink ref={ ref } { ...itemProps } />);

function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to } = props;

    return (
        <li>
            <ListItem component={ MuiLink } to={ to }>
                { icon ? <ListItemIcon>{ icon }</ListItemIcon> : null }
                <ListItemText primary={ primary } />
            </ListItem>
        </li>
    );
}

