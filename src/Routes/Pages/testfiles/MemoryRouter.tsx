import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, ListItemButton, ListItemProps, ListItemText } from "@mui/material";
import * as React from 'react';
import { MemoryRouter, Route, Routes, Link as RouterLink } from "react-router-dom";
import { AppbarV2 } from "../v2/AppBarV2";


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