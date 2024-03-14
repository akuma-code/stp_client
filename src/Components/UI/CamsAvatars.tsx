import { Avatar, SvgIcon, Tooltip } from '@mui/material'
import { MemoAvaS2 } from './Svg/AvaS2'
import { MemoAvaS3 } from './Svg/AvaS3'


export const AvatarS2 = ({ wh }: { wh?: number }) => {
    return (
        <Tooltip title='1 камера (2 стекла)'>
            <Avatar sx={ { width: wh || '1em', height: wh || '1em', bgcolor: '#8fbef8', '&:hover': { transform: 'scale(1.5)' } } } variant='rounded' alt='1 cam'>
                <SvgIcon >
                    <MemoAvaS2 />
                </SvgIcon>
            </Avatar>
        </Tooltip>
    )
}
export const AvatarS3 = ({ wh }: { wh?: number }) => {
    return (
        <Tooltip title='2 камеры (3 стекла)'>
            <Avatar sx={ { width: wh || '1em', height: wh || '1em', bgcolor: '#4382cf', '&:hover': { transform: 'scale(1.5)' } } } variant='rounded' alt='2 cam'>
                <SvgIcon>
                    <MemoAvaS3 />
                </SvgIcon>
            </Avatar>
        </Tooltip>
    )
}