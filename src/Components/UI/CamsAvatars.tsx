import { Avatar, CircularProgress, SvgIcon, Tooltip } from '@mui/material'
import { Suspense, lazy } from 'react'
const Cam1 = lazy(() => import('../UI/Svg/AvaS2'))
const Cam2 = lazy(() => import('../UI/Svg/AvaS3'))


export const AvatarS2 = ({ wh }: { wh?: number }) => {
    return (
        <Suspense fallback={
            <CircularProgress variant='indeterminate' color='info' />
        }>

            <Tooltip title='1 камера (2 стекла)'>
                <Avatar sx={ { width: wh || '1em', height: wh || '1em', bgcolor: '#8fbef8', '&:hover': { transform: 'scale(1.5)' } } } variant='rounded' alt='1 cam'>
                    <SvgIcon >
                        <Cam1 />
                    </SvgIcon>
                </Avatar>
            </Tooltip>
        </Suspense>
    )
}
export const AvatarS3 = ({ wh }: { wh?: number }) => {
    return (
        <Suspense fallback={
            <CircularProgress variant='indeterminate' color='info' />
        }>

            <Tooltip title='2 камеры (3 стекла)'>
                <Avatar sx={ { width: wh || '1em', height: wh || '1em', bgcolor: '#4382cf', '&:hover': { transform: 'scale(1.5)' } } } variant='rounded' alt='2 cam'>
                    <SvgIcon>
                        <Cam2 />
                    </SvgIcon>
                </Avatar>
            </Tooltip>
        </Suspense>
    )
}