import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { forwardRef } from 'react';
import { LinkProps as RouterLinkProps, Link as RrdLink } from 'react-router-dom';

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}

export const MuiLink = forwardRef<HTMLAnchorElement, RouterLinkProps>((itemProps, ref) => <RrdLink ref={ ref } { ...itemProps } />);
export function ListItemLink(props: ListItemLinkProps) {
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
