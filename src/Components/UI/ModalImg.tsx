import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { Suspense } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { AvatarButtonTooltip } from './AvatarButtonTooltip';




type ModalImgProps = {
    tooltip_title?: string
    dialog_title?: string
    children?: React.ReactNode
    btn_icon?: React.ReactNode


}
export function ModalImg({ tooltip_title, children, dialog_title, btn_icon }: ModalImgProps) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <Suspense
            fallback={ <CircularProgress /> }
        >

            <AvatarButtonTooltip
                icon={ btn_icon ? btn_icon : <FaRegQuestionCircle className={ 'text-orange-800' } /> }
                action={ handleClickOpen }
                tooltip_title={ tooltip_title }
            />

            <Dialog autoFocus
                fullScreen={ fullScreen }
                open={ open }
                onClose={ handleClose }
                aria-labelledby="responsive-dialog-title"
                PaperProps={ { elevation: 4 } }
            >
                <DialogTitle id="responsive-dialog-title" textTransform={ 'uppercase' } textAlign={ 'center' }>
                    { dialog_title ? dialog_title : `` }
                </DialogTitle>
                <DialogContent>
                    { children }
                </DialogContent>
                <DialogActions>

                    <Button variant={ 'contained' } onClick={ handleClose } autoFocus fullWidth color='info'>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </Suspense>

    );
}