import React from 'react'
import S2 from './Svg/S2.svg'
import S3 from './Svg/S3.svg'
import { SvgIcon, Tooltip } from '@mui/material'
import { MemoAvaS2 } from './Svg/AvaS2'
import { MemoAvaS3 } from './Svg/AvaS3'

const camIcon = {
    s2: MemoAvaS2,
    s3: MemoAvaS3
}
export const AvatarS2 = ({ wh }: { wh?: number }) => {
    return (
        <Tooltip title='1 камера (2 стекла)'>
            <SvgIcon sx={ { width: wh || '1em', height: wh || '1em' } }>
                <MemoAvaS2 />
            </SvgIcon>
        </Tooltip>
    )
}
export const AvatarS3 = ({ wh }: { wh?: number }) => {
    return (
        <Tooltip title='2 камеры (3 стекла)'>
            <SvgIcon sx={ { width: wh || '1em', height: wh || '1em' } }>
                <MemoAvaS3 />
            </SvgIcon>
        </Tooltip>
    )
}