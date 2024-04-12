import { ExtendButtonBase, Fab, FabOwnProps, FabTypeMap, Fade, SxProps } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { VoidFn } from '../../../Interfaces/Types';
import React from 'react'

export type ResetButtonProps = { open: boolean, action: VoidFn, text?: string, FabProps?: ExtendButtonBase<FabTypeMap<{}, "button">> }
const FadingResetButton = (props: ResetButtonProps) => {
    return (
        <Fade in={ props.open }>

            <Fab
                sx={ { position: 'absolute', left: 0, top: -50, zIndex: 'auto', } }
                size='small'
                variant='extended'
                onClick={ props.action }
                { ...props.FabProps }
            >
                <CloseOutlined />
                { props.text ? props.text : `Сбросить` }
            </Fab>
        </Fade>
    );
};

export default React.memo(FadingResetButton)
