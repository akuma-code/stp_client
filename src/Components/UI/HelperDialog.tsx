import React, { useState, } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { IconButton, SvgIcon } from '@mui/material';
import { FaRegQuestionCircle } from 'react-icons/fa';
import path_decibel from './../../Components/StpTable/StpPreset/images/decibels.jpg'
import path_energy from './../../Components/StpTable/StpPreset/images/energyCoeefs.jpg'
import path_light from './../../Components/StpTable/StpPreset/images/lightCoeff.jpg'

type HelperDialogProps = {
    img_name: 'light' | 'decibel' | 'energy'

}
export function HelperDialog({ img_name }: HelperDialogProps) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const Img_path = {
        light: path_light,
        energy: path_energy,
        decibel: path_decibel,
    }
    return (
        <React.Fragment >
            <IconButton onClick={ handleClickOpen }>
                <SvgIcon sx={ { maxHeight: 15 } }>
                    <FaRegQuestionCircle className={ 'text-orange-800' } />
                </SvgIcon>
            </IconButton>
            <Dialog autoFocus
                // fullScreen={ fullScreen }
                open={ open }
                onClose={ handleClose }
                aria-labelledby="responsive-dialog-title"
                PaperProps={ { elevation: 4 } }
            >
                <DialogTitle id="responsive-dialog-title">
                    { "Дополнительная информация по характеристикам стеклопакета" }
                </DialogTitle>
                <DialogContent>
                    <img alt='pic' src={ Img_path[img_name] } />
                </DialogContent>
                <DialogActions>

                    <Button onClick={ handleClose } autoFocus>
                        Понятно
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}