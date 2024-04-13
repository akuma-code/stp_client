import { Fab, Fade } from '@mui/material'
import React from 'react'
import { VoidFn } from '../../../Interfaces/Types'
import { FiCheckCircle } from 'react-icons/fi'


type CheckButtonProps = {
    open: boolean,
    action: VoidFn,
    text?: string,

}
const FadingCheckFab = (props: CheckButtonProps) => {
    return (
        <Fade in={ props.open }>
            <Fab
                sx={ { position: 'absolute', left: -45, top: -15, zIndex: 'auto', } }
                size='small'
                variant='circular'
                onClick={ props.action }
                color='success'

            >
                <FiCheckCircle fontSize={ 25 } />

            </Fab>
        </Fade>
    )
}


export default React.memo(FadingCheckFab)