import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { forwardRef } from 'react';
import { LinkProps as RouterLinkProps, Link as RrdLink, NavLink, NavLinkProps } from 'react-router-dom';

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}

export const MuiLink = forwardRef<HTMLAnchorElement, RouterLinkProps>((itemProps, ref) => <RrdLink ref={ ref } { ...itemProps } />);
export const MuiNavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((itemProps, ref) => (

    <NavLink
        ref={ ref }
        className={ ({ isActive, isPending, isTransitioning }) =>
            isPending ? 'text-blue-800' : isActive ? 'text-red-500' : "text-inherit"
        }

        { ...itemProps }

    />

));

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
