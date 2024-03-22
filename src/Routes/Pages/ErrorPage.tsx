import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import { RiArrowGoBackFill } from "react-icons/ri";
import { Box, Stack } from '@mui/material';


export const ErrorPage = () => {
    const error = useRouteError() as { statusText?: string, message?: string, data?: string, status?: number }
    console.error('router error: ', error)
    return (
        <div className='text-2xl text-center flex flex-col justify-center p-4 max-w-fit m-auto'>
            <strong>Something gone wrong...</strong>
            <Stack
                direction={ 'row' }
                gap={ 2 }
                justifyContent={ 'center' }
                color={ '#e61818' }
                bgcolor={ '#382303' }
            >
                <Link to={ '/' } className='flex gap-2'>        <strong> Back </strong> <RiArrowGoBackFill /> </Link>


            </Stack>
            <Box>
                <p>
                    <i>
                        { error.data }
                        <br />
                        Статус ошибки:{ error.status } { error.statusText }
                        <br />
                        { error.message }
                    </i>
                </p>
            </Box>
        </div>
    )
}