import { Avatar, Box, IconButton, SxProps, Theme, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { BsBootstrapFill } from "react-icons/bs";



type Props = {
    icon?: React.ReactNode
    tooltip_title?: string
    action?: (...args: any) => any
    avatarSx?: SxProps<Theme>
}

export const AvatarButtonTooltip: React.FC<Props> = ({ icon, action, tooltip_title, avatarSx }) => {
    const avatar_props: SxProps<Theme> = avatarSx ? avatarSx : { color: 'tomato', bgcolor: 'whitesmoke', width: 30, height: 30 }
    return (
        <IconButton
            onClick={ action }
            edge='start'
        >
            <Tooltip

                title={ tooltip_title ? tooltip_title : "no title" }
            >

                <Avatar
                    sx={ avatar_props }
                    variant='rounded'
                >
                    { icon ?
                        icon
                        :
                        <BsBootstrapFill />
                    }
                </Avatar>
            </Tooltip>
        </IconButton>
    )
}