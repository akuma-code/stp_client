import React, { Suspense } from 'react'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CircularProgress, Stack } from '@mui/material';
type SLProps = {
    children?: React.ReactNode
    loadText?: string
}

export const SuspenseLoad: React.FC<SLProps> = ({ children, loadText }) => {
    return (
        <Suspense fallback={ <Loading text={ loadText } /> }>
            { children }
        </Suspense>
    )
}
type LoadingProps = {
    text?: string
}
const Loading = ({ text }: LoadingProps) => {
    return <Stack justifyContent={ 'center' } height={ '100%' }>
        <Box textAlign={ 'center' }>{ text ?? 'Идет загрузка данных...' }</Box>
        <LinearProgress color='info' sx={ { width: '100%', height: 10 } } />
    </Stack>
}
