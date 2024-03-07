import { CircularProgress, IconButton, SvgIcon, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { Suspense } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
import path_decibel from './../../Components/StpTable/StpPreset/images/decibels.jpg';
import path_energy from './../../Components/StpTable/StpPreset/images/energyCoeefs.jpg';
import path_light from './../../Components/StpTable/StpPreset/images/lightCoeff.jpg';
import path_triplex from './../../Components/StpTable/StpPreset/images/triplex.jpg'



const Img_path = {
    light: path_light,
    energy: path_energy,
    decibel: path_decibel,
    triplex: path_triplex,
}
type HelperDialogProps = {
    img_name: 'light' | 'decibel' | 'energy' | "triplex" | undefined
    tooltip_title: string

}
export function HelperDialog({ img_name, tooltip_title }: HelperDialogProps) {
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
        <React.Fragment >
            <Suspense
                fallback={ <CircularProgress /> }
            >
                <Tooltip title={ tooltip_title + `. Нажмите для дополнительной справки` } PopperProps={ { placement: 'top' } }>

                    <IconButton onClick={ handleClickOpen } edge='start'
                    // sx={ { [`& :hover`]: { bgcolor: 'red' } } }
                    >
                        <SvgIcon sx={ {
                            maxHeight: 15,
                            // [`& :hover`]: { bgcolor: 'red' }
                        } } >
                            <FaRegQuestionCircle className={ 'text-orange-800' } />
                        </SvgIcon>
                    </IconButton>
                </Tooltip>

                <Dialog autoFocus
                    fullScreen={ fullScreen }
                    open={ open }
                    onClose={ handleClose }
                    aria-labelledby="responsive-dialog-title"
                    PaperProps={ { elevation: 4 } }
                >
                    <DialogTitle id="responsive-dialog-title" textTransform={ 'uppercase' } textAlign={ 'center' }>
                        { `дополнительная справка` }
                    </DialogTitle>
                    <DialogContent>
                        { img_name && <img alt='pic' src={ Img_path[img_name] } /> }
                    </DialogContent>
                    <DialogActions>

                        <Button variant={ 'contained' } onClick={ handleClose } autoFocus fullWidth color='info'>
                            Понятно
                        </Button>
                    </DialogActions>
                </Dialog>
            </Suspense>
        </React.Fragment>
    );
}