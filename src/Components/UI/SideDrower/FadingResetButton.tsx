import { ExtendButtonBase, Fab, FabOwnProps, FabTypeMap, Fade, SxProps } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { VoidFn } from '../../../Interfaces/Types';
import React from 'react'
import { FiCheckCircle } from "react-icons/fi";
export type ResetButtonProps = {
    open: boolean,
    action: VoidFn,
    text?: string,

}
const FadingResetButton = (props: ResetButtonProps) => {
    return (
        <Fade in={ props.open }>

            <Fab
                sx={ { position: 'absolute', right: -45, bottom: 5, zIndex: 'auto', } }
                size='small'
                variant='circular'
                onClick={ props.action }
                title='Сбросить'
                color='secondary'
            >
                <CloseOutlined />
                {/* { props.text ? props.text : `Сбросить` } */ }
            </Fab>

        </Fade>
    );
};

export default React.memo(FadingResetButton)
