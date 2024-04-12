import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import React, { Suspense, useEffect, useState } from 'react';
type SLProps = {
    children?: React.ReactNode
    loadText?: string
}

export const SuspenseLoad: React.FC<SLProps> = ({ children, loadText }) => {
    return (
        <Suspense fallback={ <LoadingProgres text={ loadText } /> }>
            { children }
        </Suspense>
    )
}
type LoadingProps = {
    text?: string
}
export const Loading = ({ text }: LoadingProps) => {
    return <Stack justifyContent={ 'center' } height={ '100%' }>
        <Box textAlign={ 'center' }>{ text ?? 'Идет загрузка данных...' }</Box>
        <LinearProgress color='info' sx={ { width: '100%', height: 10 } } variant='indeterminate' />
    </Stack>
}
export const LoadingProgres = ({ text }: LoadingProps) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 100));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, [])

    const msg = text ? text : progress < 100 ? `Идет загрузка данных: ${progress}%` : 'Завершено!'
    return (
        <Stack justifyContent={ 'center' } height={ '100%' } py={ 2 }>
            <Box textAlign={ 'center' } p={ 1 }><Typography variant='button' fontWeight={ 'bold' }>{ msg } </Typography></Box>
            <LinearProgress color={ progress === 100 ? 'success' : 'info' } sx={ { width: '100%', height: 10 } } variant='determinate' value={ progress } />
        </Stack>)
}
