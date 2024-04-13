import { Box, Button, Typography } from '@mui/material'
import React from 'react'

import { RiArrowGoBackFill } from 'react-icons/ri'
import { useNavigate, useRouteError } from 'react-router-dom'

const ErrorPageV2: React.FC<{}> = () => {
    const error = useRouteError() as { statusText?: string, message?: string, data?: string, status?: number }
    const nav = useNavigate()

    return (
        <Box maxWidth={ 500 } mx='auto' pt={ 5 }>


            <Button variant='outlined' fullWidth={ false } size='large' onClick={ () => nav(-1) }>
                <Typography variant='button' px={ 4 }>
                    Назад
                </Typography>
                <RiArrowGoBackFill />
            </Button>




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
