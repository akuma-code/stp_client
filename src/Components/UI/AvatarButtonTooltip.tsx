import { Avatar, Box, IconButton, SxProps, Theme, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { BsBootstrapFill } from "react-icons/bs";



type Props = {
    icon?: React.ReactNode
    tooltip_title?: React.ReactNode
    action?: (...args: any) => any
    avatarSx?: SxProps<Theme>
    avatarVariant?: "square" | "rounded" | "circular"
    disableRipple?: boolean
}
const avaProps: SxProps<Theme> = { color: '#991d07', bgcolor: 'whitesmoke', width: 30, height: 30 }
export const AvatarButtonTooltip: React.FC<Props> = ({ icon, action, tooltip_title, avatarSx, avatarVariant = 'rounded', disableRipple = false }) => {
    const avatar_props: SxProps<Theme> = avatarSx ? { ...avaProps, ...avatarSx } : avaProps
    return (
        <IconButton
            onClick={ action }
            edge='start'
            disableRipple={ disableRipple }
        >
            <Tooltip
                placement='top'
                title={ tooltip_title ? tooltip_title : "no title" }
            >

                <Avatar
                    sx={ avatar_props }
                    variant={ avatarVariant }
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