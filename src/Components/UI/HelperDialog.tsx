import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { Suspense } from 'react';
import { LiaInfoSolid } from 'react-icons/lia';
import path_decibel from './../../Components/StpTable/StpPreset/images/decibels.jpg';
import path_energy from './../../Components/StpTable/StpPreset/images/energyCoeefs.jpg';
import path_light from './../../Components/StpTable/StpPreset/images/lightCoeff.jpg';
import path_triplex from './../../Components/StpTable/StpPreset/images/triplex.jpg';
import { AvatarButtonTooltip } from './AvatarButtonTooltip';



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
    const ttText = <span>{ tooltip_title }<br />Нажмите для дополнительной справки</span>
    return (

        <Suspense
            fallback={ <CircularProgress /> }
        >
            <AvatarButtonTooltip
                icon={ <LiaInfoSolid className={ 'text-blue-600' } /> }
                tooltip_title={ ttText }
                action={ handleClickOpen }
                avatarVariant='circular'
                avatarSx={ { width: 20, height: 20 } }

            />

            {/* <Tooltip title={ ttText } PopperProps={ { placement: 'top' } }>
                <IconButton onClick={ handleClickOpen } edge='start'                    >
                    <SvgIcon sx={ {
                        maxHeight: 15,
                    } } >
                        <FaRegQuestionCircle className={ 'text-yellow-600' } />
                    </SvgIcon>
                </IconButton>
            </Tooltip> */}

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
                    { img_name && <img alt='pic' src={ Img_path[img_name] } loading='lazy' /> }
                </DialogContent>
                <DialogActions>

                    <Button variant={ 'contained' } onClick={ handleClose } autoFocus fullWidth color='info'>
                        Понятно
                    </Button>
                </DialogActions>
            </Dialog>
        </Suspense>

    );
}