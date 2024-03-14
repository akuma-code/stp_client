import { Dialog, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react';
import { FcInfo } from "react-icons/fc";
import { _ID } from '../../Helpers/helpersFns';
import { nameDescriptor, parseStpName } from '../StpTable/FormulaParser';
import { AvatarButtonTooltip } from './AvatarButtonTooltip';
import { TStandartNames } from '../StpTable/StpTagsMaker';




const Transition = React.forwardRef((
    props: TransitionProps & { children: React.ReactElement<any, any>; },
    ref: React.Ref<unknown>,
) => {
    return <Slide direction="left" ref={ ref } { ...props } mountOnEnter unmountOnExit />;
});

type Props = {
    stp_name: string
}
export const FormulaTTButton: React.FC<Props> = ({ stp_name }) => {
    const [open, setOpen] = useState(false)
    const parsed_name = parseStpName(stp_name)
    const info = nameDescriptor(parsed_name).map(s => (<span key={ _ID() + s }>{ s }<br /></span>))

    const title = <strong>{ stp_name }</strong>
    const content_text = TStandartNames.includes(stp_name)
        ? <span>{ info } <br /><strong>Стандартный стеклопакет в компании Аттик </strong>  </span>
        : <span>{ info }</span>
    return (
        <>
            <AvatarButtonTooltip
                icon={ <FcInfo /> }
                tooltip_title={ 'посмотреть расшифровку' }
                action={ () => setOpen(true) }
            />


            <Dialog
                open={ open }
                onClose={ () => setOpen(false) }
                TransitionComponent={ Transition }

            >
                <DialogTitle textAlign={ 'center' }>{ title }</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText textAlign={ 'left' }>
                        { content_text }

                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}