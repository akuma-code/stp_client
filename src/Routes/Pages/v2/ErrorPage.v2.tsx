import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { MuiLink } from '../MuiLink'

import { RiArrowGoBackFill } from 'react-icons/ri'
import { useRouteError } from 'react-router-dom'

const ErrorPageV2: React.FC<{}> = () => {
    const error = useRouteError() as { statusText?: string, message?: string, data?: string, status?: number }


    return (
        <Box maxWidth={ 500 } mx='auto' pt={ 5 }>

            <MuiLink to={ '/' }>
                <Button variant='outlined' fullWidth={ false } size='small'>
                    <Typography variant='button' px={ 4 }>
                        Назад на главную
                    </Typography>
                    <RiArrowGoBackFill />
                </Button>
            </MuiLink>



            <Box>
                <p>
                    <strong>Что-то пошло не так...</strong>
                    <br />
                    <i>
                        { error.data }
                        <br />
                        Статус ошибки:{ error.status } { error.statusText }
                        <br />
                        { error.message }
                    </i>
                </p>
            </Box>
        </Box>
    )
}

export default ErrorPageV2
