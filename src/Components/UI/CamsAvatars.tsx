import { Avatar, CircularProgress, SvgIcon, SvgIconProps, Tooltip } from '@mui/material'
import { Suspense, memo } from 'react'
import MemoAvaS3 from '../UI/Svg/AvaS3'
import MemoAvaS2 from './Svg/AvaS2'



export const AvatarS2 = ({ wh }: { wh?: number }) => {
    return (
        <Suspense fallback={
            <CircularProgress variant='indeterminate' color='info' />
        }>

            <Tooltip title='1 камера (2 стекла)'>
                <Avatar sx={ { width: wh || '1em', height: wh || '1em', bgcolor: '#8fbef8', '&:hover': { transform: 'scale(1.5)' } } } variant='rounded' alt='1 cam'>
                    <SvgIcon >
                        <MemoAvaS2 />
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
                        <MemoAvaS3 />
                    </SvgIcon>
                </Avatar>
            </Tooltip>
        </Suspense>
    )
}

export const CamOneIcon = memo(({ wh }: { wh?: string | number }) => {
    const w = wh ? wh : '1.5em'
    const h = wh ? wh : '1.5em'
    return (
        <Suspense fallback={
            <CircularProgress variant='indeterminate' color='info' />
        }>

            <SvgIcon sx={ { width: w, height: h } }>
                <MemoAvaS2 />
            </SvgIcon>
        </Suspense>
    )
})
export const CamTwoIcon = memo(({ wh }: { wh?: string | number }) => {
    const w = wh ? wh : '1.5em'
    const h = wh ? wh : '1.5em'
    return (
        <Suspense fallback={
            <CircularProgress variant='indeterminate' color='info' />
        }>

            <SvgIcon sx={ { width: w, height: h } }>
                <MemoAvaS3 />
            </SvgIcon>
        </Suspense>
    )
})

type CamAvatarProps = {
    wh?: string | number
    cam_count: 1 | 2
    variant?: "rounded" | "circular" | "square"
    show_tooltip?: string
}
export const CamAvatar: React.FC<CamAvatarProps> = ({ wh, cam_count, variant, show_tooltip }) => {

    const icon = cam_count === 1 ? <MemoAvaS2 /> : cam_count === 2 ? <MemoAvaS3 /> : null
    const title = cam_count === 1 ? '1 камера (2 стекла)' : '2 камеры (3 стекла)'
    return (
        <Suspense fallback={
            <CircularProgress variant='indeterminate' color='info' />
        }>

            <Tooltip title={ show_tooltip ?? title }>
                <Avatar sx={ {
                    width: wh || '1em',
                    height: wh || '1em',
                    bgcolor: cam_count === 1 ? '#4382cf' : '#093264',
                    '&:hover': { transform: 'scale(1.5)' },
                } }
                    variant={ variant || 'rounded' }
                    alt='2 cam'>
                    <SvgIcon>
                        { icon }
                    </SvgIcon>
                </Avatar>
            </Tooltip>
        </Suspense>
    )
}

export const SvgCam = ({ type }: { type: 's1' | 's2' }) => {
    const icons = {
        s1: ({ props }: { props: SvgIconProps }) => <SvgIcon { ...props }><MemoAvaS2 /></SvgIcon>,
        s2: ({ props }: { props: SvgIconProps }) => <SvgIcon { ...props }><MemoAvaS3 /></SvgIcon>
    }

    return icons[type]
}

