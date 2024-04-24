import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useToggle } from '../../../Hooks/useToggle';
// import SideForm from './SideForm';
import { observer } from 'mobx-react-lite';
import { useFilterContext } from '../../../Hooks/useFilterContext';
import { BsFillFilterSquareFill } from 'react-icons/bs';


type Anchor = 'top' | 'left' | 'bottom' | 'right';

export const FilterDrawer = observer(() => {
    const [show, control] = useToggle()


    const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        control.toggle()
    };


    return (
        <div>

            <React.Fragment >
                <Button onClick={ toggleDrawer }
                    variant='outlined'
                    color={ 'secondary' }
                    startIcon={ <BsFillFilterSquareFill /> }
                    size='small'
                >
                    Включить фильтры
                </Button>
                <Drawer
                    anchor={ 'left' }
                    open={ show }
                    onClose={ () => control.off() }
                >
                    {/* <SideForm onClose={ control.off } /> */ }
                </Drawer>
            </React.Fragment>

        </div>
    );
})

FilterDrawer.displayName = '___Form Filter Drawer'


const list = () => (
    <Box
        sx={ { width: 250 } }
        role="presentation"
    // onClick={ toggleDrawer }
    // onKeyDown={ toggleDrawer }
    >
        <List>
            { ['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem key={ text } disablePadding>
                    <ListItemButton>
                        {/* <ListItemIcon>
                                { index % 2 === 0 ? "InboxIcon" : "MailIcon" }
                            </ListItemIcon> */}
                        <ListItemText primary={ text } />
                    </ListItemButton>
                </ListItem>
            )) }
        </List>
        <Divider />
        <List>
            { ['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={ text } disablePadding>
                    <ListItemButton>
                        {/* <ListItemIcon>
                                { index % 2 === 0 ? "INBOX" : "MAIL" }
                            </ListItemIcon> */}
                        <ListItemText primary={ text } />
                    </ListItemButton>
                </ListItem>
            )) }
        </List>
    </Box>
);