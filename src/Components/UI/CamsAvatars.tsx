import { Avatar, CircularProgress, SvgIcon, SvgIconProps, SvgIconTypeMap, Tooltip } from '@mui/material'
import { Suspense, lazy, memo } from 'react'
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

export const CamOneIcon = memo(({ wh }: { wh?: string | number }) => {
    const w = wh ? wh : '1.5em'
    const h = wh ? wh : '1.5em'
    return (
        <Suspense fallback={
            <CircularProgress variant='indeterminate' color='info' />
        }>

            <SvgIcon sx={ { width: w, height: h } }>
                <Cam1 />
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
                <Cam2 />
            </SvgIcon>
        </Suspense>
    )
})

type CamAvatarProps = {
    wh?: string | number
    cam_count: 1 | 2

}
export const CamAvatar: React.FC<CamAvatarProps> = ({ wh, cam_count }) => {

    const icon = cam_count === 1 ? <Cam1 /> : cam_count === 2 ? <Cam2 /> : null

    return (
        <Suspense fallback={
            <CircularProgress variant='indeterminate' color='info' />
        }>

            <Tooltip title='2 камеры (3 стекла)'>
                <Avatar sx={ {
                    width: wh || '1em',
                    height: wh || '1em',
                    bgcolor: cam_count === 1 ? '#4382cf' : '#0c2e58',
                    '&:hover': { transform: 'scale(1.5)' },
                } }
                    variant='rounded'
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
        s1: ({ props }: { props: SvgIconProps }) => <SvgIcon { ...props }><Cam1 /></SvgIcon>,
        s2: ({ props }: { props: SvgIconProps }) => <SvgIcon { ...props }><Cam2 /></SvgIcon>
    }

    return icons[type]
}

